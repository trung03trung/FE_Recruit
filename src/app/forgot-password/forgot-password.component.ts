import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../../app/@core/services/forgot-pass.service';


@Component({
  selector: 'ngx-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  
  message='';
  formEmail=new FormGroup({
    email:new FormControl('',[ Validators.email]),
  });

  constructor(  private forgotPasswordService: ForgotPasswordService,private fb: FormBuilder) { }

  ngOnInit(): void {
    
    this.initForm();
  }
  initForm() {
    this.formEmail = this.fb.group({
      email: ['', Validators.email],
     
    });
  }
  
  onSubmit(){
   
   
    if ( this.formEmail.valid) {
      this.forgotPasswordService.sendOTP(this.formEmail.controls.email.value).subscribe(
        data => {
                this.message=data.message
                if(this.message=='Gửi')
                localStorage.setItem('email', this.formEmail.controls.email.value);   
        }
      );
    }
    
  }

}
