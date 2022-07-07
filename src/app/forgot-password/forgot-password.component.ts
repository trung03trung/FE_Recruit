
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ForgotPasswordService } from "../../app/@core/services/forgot-pass.service";
import { Router } from "@angular/router";
import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../../app/@core/services/forgot-pass.service';
import { Router } from '@angular/router';

@Component({
  selector: "ngx-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  message = "";
  formEmail = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
export class ForgotPasswordComponent implements OnInit, DoCheck {
  message = '';
  formEmail = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
  });
  disableClick = "disableClick";

  constructor(
    private forgotPasswordService: ForgotPasswordService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  constructor(private forgotPasswordService: ForgotPasswordService, private fb: FormBuilder,
    private router: Router,) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formEmail = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.formEmail.valid) {
      const email = this.formEmail.controls.email.value;
      this.forgotPasswordService.tranferMail(email);
      this.forgotPasswordService.sendOTP(email).subscribe((data) => {
        this.message = data.message;
        if (this.message == "success")
          this.router.navigate(["/change-password/"]);
        this.forgotPasswordService
          .sendOTP(this.formEmail.controls.email.value)
          .subscribe((data) => {
            this.message = data.message;
            console.log(this.message);
          });
      });
  }
}
