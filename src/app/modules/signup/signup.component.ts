import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../@core/services/auth.service";
import { TokenService } from "../../@core/services/token.service";
import { Router } from "@angular/router";

@Component({
  selector: 'ngx-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, DoCheck {
  message = 'a';
  formSignup: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
  ) {
  }
  disableClick = "disableClick";
  ngDoCheck(): void {
    if (this.formSignup.valid) {
      this.disableClick = "";
    } else {
      this.disableClick = "disableClick";
    }
  }

  ngOnInit(): void {
    this.formSignup = new FormGroup(
      {
        userName: new FormControl(''),
        password: new FormControl(''),
        email: new FormControl(''),
        newPassword: new FormControl(''),
        birthDay: new FormControl(''),
        phoneNumber: new FormControl(''),
        name: new FormControl(''),
      }
    )
    this.initForm();
  }

  initForm() {
    this.formSignup = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,16}$')]],
      birthDay: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})\\b')]],
      name: "",
    });
  }

  signup() {
    this.authService.signup(this.formSignup.value).subscribe(data => {
      this.message = data.status
      if (this.message == 'OK') {
        this.router.navigate(['/auth']);
      }
    });
  }

}
