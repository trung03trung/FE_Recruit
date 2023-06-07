import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../../@core/services/script.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header-public',
  templateUrl: './header-public.component.html',
  styleUrls: ['./header-public.component.scss']
})
export class HeaderPublicComponent implements OnInit {
  checkloggin = false;
  userName = '';
  constructor(
    private script: ScriptService,
    private router:Router) { }

  ngOnInit(): void {
    this.checkuser();
  }
  checkuser(){
    const userinfo = JSON.parse(localStorage.getItem('auth-user'));
    if(!userinfo){
      this.checkloggin =false;
    }
    else{
      const role = userinfo.auth;
      const sub = userinfo.sub;
      this.checkloggin = true;
      this.userName = sub;
    }
  }
  logout(){
    localStorage.removeItem('auth-token'),
    localStorage.removeItem('auth-user')
  }


}
