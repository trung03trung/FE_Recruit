import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { job } from "../../../@core/models/job";
import { RecruitmentService } from "../../../@core/services/recuitmentP.service";

@Component({
  selector: "ngx-popup-apply",
  templateUrl: "./popupApply.component.html",
  styleUrls: ["./popupApply.component.scss"],
})
export class PopupApply implements OnInit {
  [x: string]: any;
  profileP: FormGroup;
  idJob:any;
  userName: string;
  role : string;
  
  checkloggin= false;
  constructor(private recruitmentService: RecruitmentService ,private formBuilder: FormBuilder,private router:ActivatedRoute) {}
  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.idJob = params['id'];
    });
    console.log(this.idJob);  
    this.initForm();
    this.registerJob();
  }
  initForm() {
    this.profileP = this.formBuilder.group({
      iduser: new FormControl("", [Validators.required]),
      idjob: new FormControl("", [Validators.required]),
      //cv_file: new FormControl("", [Validators.required, Validators.email]),
    });
  }
  registerJob(){
    const userinfo = JSON.parse(localStorage.getItem('auth-user'));
    if(!userinfo){
      this.checkloggin =false;
    }
    else{
      this.role = userinfo.auth;
      this.userName = userinfo.sub;
      if(this.role === 'ROLE_ADMIN' || this.role === 'ROLE_JE' ||this.role === 'ROLE_USER'){
        this.checkloggin = true;
        console.log(this.userName);
        console.log(this.role);
      }
    }
    if(this.idjob || this.checkloggin){
      this.recruitmentService.registerJob(this.profileP.value).subscribe(data=>{
          console.log(data);
      })
      console.log();
    }else{
        alert("LỖi")
    }

  }
}
