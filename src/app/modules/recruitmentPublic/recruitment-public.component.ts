import { Component, OnInit } from "@angular/core";
import {FormGroup } from "@angular/forms";
import { job } from "../../@core/models/job";
import { RecruitmentService } from "../../@core/services/recuitment-public.service";
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
@Component({
  selector: "ngx-recruitment-public",
  templateUrl: "./recruitment-public.component.html",
  styleUrls: ["./recruitment-public.component.scss"],
})

export class RecruitmentPublicComponent implements OnInit {
  [x: string]: any;
  jobDetail: FormGroup;
  jobObj: job = new job();
  jobList: job[];
  pageNumber = [1, 2, 3];
  checkloggin = false;
  userName = '';
  
  userMenu = [ { title: 'Thông tin cá nhân' },{ title: 'Đổi mật khẩu' }, { title: 'Đăng xuất'   } ];
  constructor(
    private recuitmentse: RecruitmentService,
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
