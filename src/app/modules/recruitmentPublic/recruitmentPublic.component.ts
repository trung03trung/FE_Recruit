import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { job } from "../../@core/models/job";
import { RecruitmentService } from "../../@core/services/recuitmentP.service";
import { TokenService } from "../../@core/services/token.service";

@Component({
  selector: "ngx-recruitment-public",
  templateUrl: "./recruitmentPublic.component.html",
  styleUrls: ["./recruitmentPublic.component.scss"],
})
export class RecruitmentPublicComponent implements OnInit {
  [x: string]: any;
  jobDetail: FormGroup;
  jobObj: job = new job();
  jobList: job[];
  pageNumber = [1, 2, 3];
  checkloggin = false;
  constructor(
    private formBuilder: FormBuilder,
    private recuitmentse: RecruitmentService,
    private tokenService :TokenService,
  ) {}

  ngOnInit(): void {
    this.checkuser();
    this.initForm();
    this.getAllJobPublic() 
  }
  initForm() {}

  getAllJobPublic() {
    this.recuitmentse.getAllJob().subscribe(
      (data) => {
        this.jobList = data;
        //console.log(data);
      },
      (err) => {
        console.log("error while fetching data.");
      }
    );
  }

  checkuser(){
    const userinfo = JSON.parse(localStorage.getItem('auth-user'));
    if(!userinfo){
      this.checkloggin =false;
    }
    else{
      const role = userinfo.auth;
      if(role === 'ROLE_ADMIN' || role === 'ROLE_JE' ||role === 'ROLE_USER'){
        this.checkloggin = true;
      }
    }
  }
  logout(){
    localStorage.removeItem('auth-token'),
    localStorage.removeItem('auth-user')
  }
}
