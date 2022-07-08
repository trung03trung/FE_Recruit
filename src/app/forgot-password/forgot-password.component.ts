

import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../../app/@core/services/forgot-pass.service';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],

})
export class ForgotPasswordComponent implements OnInit, DoCheck {
  message = "";
  formEmail = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
  });

  disableClick = "disableClick";
  loading = "";

  constructor(
    private forgotPasswordService: ForgotPasswordService,
    private fb: FormBuilder,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.formEmail = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }
  ngDoCheck(): void {
    if (this.formEmail.valid) {
      this.disableClick = '';
    } else {
      this.disableClick = 'disableClick';
    }
  }

  onSubmit() {
    if (this.formEmail.valid) {
      this.loading = "spinner-border spinner-border-sm";
      this.forgotPasswordService.tranferMail(this.formEmail.controls.email.value);
      this.forgotPasswordService.sendOTP(this.formEmail.controls.email.value).subscribe(data => {
          this.message = data.status;
          if (this.message == 'OK')
            this.router.navigate(['/change-password/']);
          else
            this.loading="";

    });
  }
}
}
