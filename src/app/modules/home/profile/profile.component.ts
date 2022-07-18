import { HttpClient, HttpResponse } from "@angular/common/http";
import { AfterContentInit, Component, DoCheck, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PrimeNGConfig } from "primeng/api";
import { SessionService } from "../../../@core/services/session.service";
import { User } from "./profile.model";
import { ProfileService } from "./profile.service";

@Component({
  selector: "ngx-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  [x: string]: any;
  formProfile: FormGroup;
  user: User;
  @ViewChild("labelImport")
  labelImport: ElementRef;
  userName: any;
  filetoUpload:any;
  dbImage: any;
  filea:File;
  constructor(
    private sessionService: SessionService,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private primengConfig: PrimeNGConfig,
    private httpClient:HttpClient
  ) { }


  ngOnInit(): void {
    this.primengConfig.ripple = true;
    // this.getByUserName();
    
    this.getByUserName();
    this.initForm();
    console.log(this.user);
  }

  initForm() {
    this.formProfile = this.fb.group({
      id: [""],
      avatarName:[""],
      name: ["", Validators.required],
      email: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      birthDay: ["", Validators.required],
      homeTown: ["", Validators.required],
      gender: ["Nam", Validators.required],
    });

  }

  getByUserName() {
    const userinfo = JSON.parse(localStorage.getItem("auth-user"));
    const name = userinfo.sub;
    console.log(name);

    this.profileService.getProfile(name).subscribe((res) => {
      this.updateForm(res);
      console.log(res)
      this.user=res;
      console.log(this.user)
      this.profileService.viewImage(this.user.avatarName).subscribe(data=>{
      this.postResponse = data;
        console.log(data);
        this.dbImage= "data:image/jpeg;base64," + this.postResponse.image;
    })
    });
    
  }

  onSelect(file: File) {
    this.labelImport.nativeElement.innerText = file[0].name;
    this.fileToUpload = file[0];
    this.filea=file[0];
     console.log(this.filea);
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (event) => {
      this.dbImage = event.target.result;
      console.log(this.dbImage)
    };
   
  }
  updateForm(user: User): void {
    this.formProfile.patchValue({
      id: user.id,
      avatarName:[],
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      birthDay: user.birthDay,
      homeTown: user.homeTown,
      gender: user.gender,
    });
    
  }
  imageUploadAction() {
    const imageFormData = new FormData();
    imageFormData.append("image", this.fileToUpload, this.fileToUpload.name);
    console.log(imageFormData)
    this.httpClient
      .post("http://localhost:9090/api/public/upload/image/", imageFormData, {
        observe: "response",
      })
      .subscribe((response) => {
        if (response.status === 200) {
          this.postResponse = response;
          this.successResponse = this.postResponse.body.message; 
          this.getByUserName();
        } else {
          this.successResponse = "Image not uploaded due to some error!";
        }
      });
     
  }

  viewImage() {
    console.log(this.user.avatarName)
    this.profileService.viewImage(this.user.avatarName).subscribe(data=>{
      this.postResponse = data;
        console.log(data);
        this.dbImage= "data:image/jpeg;base64," + this.postResponse.image;
    })
  }
  onSubmit(){
    this.formProfile.patchValue({
      avatarName:this.filea.name
    })
    this.profileService.updateProfile(this.formProfile.value).subscribe(data=>{
      if(data!=null){
        alert('Success');
      }
    });
    this.imageUploadAction();
    
  }
}
