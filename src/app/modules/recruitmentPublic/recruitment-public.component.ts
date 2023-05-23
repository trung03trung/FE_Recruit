import { Component, OnInit } from "@angular/core";
import {FormGroup } from "@angular/forms";
import { job } from "../../@core/models/job";
import { RecruitmentService } from "../../@core/services/recuitment-public.service";
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { ScriptService } from "../../@core/services/script.service";
@Component({
  selector: "ngx-recruitment-public",
  templateUrl: "./recruitment-public.component.html",
  styleUrls: ["./recruitment-public.component.scss"],
})

export class RecruitmentPublicComponent implements OnInit {
  [x: string]: any;
  jobDetail: FormGroup;
  jobObj: job = new job();
  jobList: any;
  jobNew: any;
  pageNumber = [1, 2, 3];
  checkloggin = false;
  userName = '';
  base64 = 'data:image/jpeg;base64,'
  
  userMenu = [ { title: 'Thông tin cá nhân' },{ title: 'Đổi mật khẩu' }, { title: 'Đăng xuất'   } ];
  constructor(
    private recuitmentse: RecruitmentService,
    private script: ScriptService
  ) {}

  ngOnInit(): void {
    this.checkuser();
    this.initForm();
    this.getAllJobPublic("FEATURED");
    this.getAllJobNew("NEWEST");
    this.script.load('jquery', 'owlcarousel','wow','easing','waypoints','main').then(data => {
      console.log('script loaded ', data);
  }).catch(error => console.log(error));
  }
  initForm() {}

  getAllJobPublic(type:string) {
    this.recuitmentse.getAllJob(type).subscribe(
      (data) => {
        this.jobList = data;
      },
      (err) => {
        console.log("error while fetching data."+err);
      }
    );
  }

  getAllJobNew(type:string) {
    this.recuitmentse.getAllJob(type).subscribe(
      (data) => {
        this.jobNew = data;
      },
      (err) => {
        console.log("error while fetching data."+err);
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
      const sub = userinfo.sub;
      if(role === 'ROLE_ADMIN' || role === 'ROLE_JE' ||role === 'ROLE_USER'){
        this.checkloggin = true;
        this.userName = sub;
      }
    }
  }
  logout(){
    localStorage.removeItem('auth-token'),
    localStorage.removeItem('auth-user')
  }
}
