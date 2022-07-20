import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Toaster } from 'ngx-toast-notifications';
import { UserPublicService } from '../../../@core/services/user-public.service';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-the-password-public.component.html',
  styleUrls: ['./change-the-password-public.component.scss'],
})
export class ChangeThePasswordPublicComponent implements OnInit {
  [x: string]: any;
  changeThePassw: FormGroup;
  saveNewPass: FormGroup;
  message = '';
  constructor(
    private formBuilder: FormBuilder,
    private userPublicService: UserPublicService,
    private toaster: Toaster
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.changeThePassw = this.formBuilder.group({
      userName: new FormControl('username', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,16}$'
        ),
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,16}$'
        ),
      ]),
      confirmNewPassword: new FormControl('', [Validators.required]),
    });
  }
  showToaster(message: string, typea: any) {
    const type = typea;
    this.toaster.open({
      text: message,
      caption: 'Status',
      type: type,
      duration: 3000,
    });
  }
  changeThePass() {
    const userinfo = JSON.parse(localStorage.getItem('auth-user'));
    const user = userinfo.sub;
    this.changeThePassw.value.userName = user;
    this.userPublicService.changeThePassword(this.changeThePassw.value).subscribe(
      (data) => {
        if (data.body.status == 'BAD_REQUEST') {
          this.showToaster('Mật khẩu hiện tại sai', 'danger');
        }
        if (data.body.status == 'OK') {
          this.showToaster('Đổi mật khẩu thành công', 'success');
        }
      },
      (error) => {
        this.showToaster('Mật khẩu hiện tại sai', 'danger');
      }
    );
  }
  clearForm() {
    this.changeThePassw.reset();
  }
}
