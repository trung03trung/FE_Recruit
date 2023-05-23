import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import {  Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators,FormControl } from "@angular/forms";
import { PrimeNGConfig } from "primeng/api";
import { SessionService } from "../../../@core/services/session.service";
import { User } from "./profile.model";
import { ProfileService } from "./profile.service";
import { formatDate } from '@angular/common';
import { Toaster } from "ngx-toast-notifications";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
   Authorization:'Bearer '+localStorage.getItem('auth-token'),
  }),
}
@Component({
  selector: "ngx-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  [x: string]: any;
  formProfile = new FormGroup({
    id:new FormControl(""),
    name:new FormControl(""),
    email:new FormControl(""),
    phoneNumber:new FormControl(""),
    birthDay:new FormControl(""),
    homeTown: new FormControl(""),
    gender:new FormControl(""),
  });
  user: User;
  @ViewChild("labelImport")
  labelImport: ElementRef;
  userName: any;
  filetoUpload:any;
  dbImage: any;
  filea:File;
  isChange=false;
  currentDate= new Date();
  constructor(
    private sessionService: SessionService,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private primengConfig: PrimeNGConfig,
    private httpClient:HttpClient,
    private toaster:Toaster
  ) { }


  ngOnInit(): void {
    
    // this.getByUserName();
    this.getByUserName();
  }

  initForm(user:User) {
    this.formProfile = this.fb.group({
      id: [user.id],
      name: [user.name, Validators.required],
      email: [user.email, [Validators.required,Validators.email]],
      phoneNumber: [user.phoneNumber,[Validators.required,Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})\\b')]],
      birthDay: [formatDate(user.birthDay,'yyyy-MM-dd','en'), Validators.required],
      homeTown: [user.homeTown, Validators.required],
      gender: [user.gender, Validators.required],
    });

  }

  getByUserName() {
    const userinfo = JSON.parse(localStorage.getItem("auth-user"));
    const name = userinfo.sub;
  

    this.profileService.getProfile(name).subscribe((res) => {
      console.log(res);
      this.initForm(res);
      this.user=res;
        this.dbImage= "data:image/jpeg;base64," + res.avatarName;
        this.profileService.tranferData(res.avatarName);
    });
    
  }

  onSelect(file: File) {
    this.isChange=true;
    this.fileToUpload = file[0];
    this.filea=file[0];
     console.log(this.filea);
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (event) => {
      this.dbImage = event.target.result;
    };
   
  }
    

  // imageUploadAction() {
  //   const imageFormData = new FormData();
  //   imageFormData.append("image", this.fileToUpload, this.fileToUpload.name);
  //   console.log(imageFormData)
  //   this.httpClient
  //     .post("http://localhost:9090/api/public/upload/image/", imageFormData, {
  //       observe: "response",
  //     })
  //     .subscribe((response) => {
  //       if (response.status === 200) {
  //         this.postResponse = response;
  //         this.successResponse = this.postResponse.body.message; 
  //         this.getByUserName();
  //         this.profileService.tranferData(this.postResponse.image);
  //       } else {
  //         this.successResponse = "Image not uploaded due to some error!";
  //       }
  //     });
     
  // }

  // viewImage() {
  //   this.profileService.viewImage(this.user.avatarName).subscribe(data=>{
  //     this.postResponse = data;
  //       this.dbImage= "data:image/jpeg;base64," + this.postResponse.image;
  //   })
  // }
  onSubmit(){
    const formData=new FormData();
    var datestr = (new Date(this.formProfile.controls.birthDay.value)).toUTCString();
    formData.append("id",this.formProfile.controls.id.value)
    if(this.isChange)
      formData.append("avatarName",this.filea,this.filea.name)
    formData.append("name",this.formProfile.controls.name.value)
    formData.append("email",this.formProfile.controls.email.value)
    formData.append("phoneNumber",this.formProfile.controls.phoneNumber.value)
    formData.append("homeTown",this.formProfile.controls.homeTown.value)
    formData.append("gender",this.formProfile.controls.gender.value)
    formData.append("birthDay",datestr)
    this.profileService.updateProfile(formData).subscribe(data=>{
      if(data!=null){
        this.showToaster("Cập nhật thành công","success");
        this.profileService.tranferData(data.avatarName);
      }
    });
    
  }
  showToaster(message: string,typea:any) {
    const type = typea;
    this.toaster.open({
      text: message,
      caption: 'Thành công',
      type: type,
      duration: 3000
    });
  }
}
