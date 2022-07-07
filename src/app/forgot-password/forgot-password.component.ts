import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../../app/@core/services/forgot-pass.service';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
<<<<<<< HEAD
export class ForgotPasswordComponent implements OnInit {

  message='';
  formEmail=new FormGroup({
    email:new FormControl('',[ Validators.email,Validators.required]),
=======
export class ForgotPasswordComponent implements OnInit, DoCheck {
  message = '';
  formEmail = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
>>>>>>> 0e5c57e84c54e74b337fd804b5f9576eca658de7
  });
  disableClick = "disableClick";

<<<<<<< HEAD
  constructor(  private forgotPasswordService: ForgotPasswordService,private fb: FormBuilder,
    private router: Router) { }
=======
  constructor(private forgotPasswordService: ForgotPasswordService, private fb: FormBuilder,
    private router: Router,) { }
>>>>>>> 0e5c57e84c54e74b337fd804b5f9576eca658de7

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formEmail = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
<<<<<<< HEAD

  onSubmit(){
    if ( this.formEmail.valid) {
      const email = this.formEmail.controls.email.value;
      this.forgotPasswordService.tranferMail(email);
      this.forgotPasswordService.sendOTP(email).subscribe(
        data => {
          this.message=data.message;
          // eslint-disable-next-line eqeqeq
          if(this.message == 'success') {
            this.router.navigate(['/change-password/']);
          }
      this.forgotPasswordService.sendOTP(this.formEmail.controls.email.value).subscribe(
        (data1) => {
              this.message=data1.message;
              console.log(this.message);
          });
      });
=======
  
  ngDoCheck(): void {
    if (this.formEmail.valid) {
      this.disableClick = "";
    } else {
      this.disableClick = "disableClick";
    }
  }


  onSubmit() {
    if (this.formEmail.valid) {


      this.forgotPasswordService.tranferMail(this.formEmail.controls.email.value);
      this.forgotPasswordService.sendOTP(this.formEmail.controls.email.value).subscribe(
        data => {
          this.message = data.status;
          if (this.message == 'OK')
            this.router.navigate(['/change-password/'])
        });
>>>>>>> 0e5c57e84c54e74b337fd804b5f9576eca658de7
    }
  }
}
