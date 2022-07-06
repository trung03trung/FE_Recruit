import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../@core/services/auth.service';
import { TokenService } from '../../@core/services/token.service';
import jwt_decode from "jwt-decode";
import { TokenInterceptor  } from "../../@core/services/interceptor.service";
import { User } from '../home/profile/profile.model';

@Component({
  selector: 'ngx-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  formLogin: FormGroup;
  isSubmitted = false;
  roles: string[] = [];
  isLoggedIn = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initForm();
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenService.getUser().roles;
    }

  }

  initForm() {
    this.formLogin = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.formLogin.controls;
  }


  onSubmit() {
    this.isSubmitted = true;
    if (this.formLogin.valid) {
      this.authService.login(this.formLogin.value).subscribe(
        data => {
          this.isLoggedIn = true;
          // save token sisson 
          this.tokenService.saveToken(data.token);
          this.tokenService.saveUser(jwt_decode(data.token));
          // save user localstorage
          var user = JSON.stringify(jwt_decode(data.token));
          localStorage.setItem('user', user);
          // router 
          if(localStorage.getItem('user')!=null){
            const userinfo = JSON.parse(localStorage.getItem('user'));
            // lấy ra auth để router
            const role = userinfo.auth;
            console.log('login wwith '+role);
            if(role === "ROLE_ADMIN" || role === "ROLE_JE"){
              // router admin
              this.router.navigate(['/home/'])
            }
            else{
              // router public
              this.router.navigate(['/auth'])
            }
          }
        }
      );
    }
  }

}
