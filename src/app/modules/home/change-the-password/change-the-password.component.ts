import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Toaster } from "ngx-toast-notifications";
import { UserService } from "../../../@core/services/user.service";

@Component({
  selector: "ngx-change-password",
  templateUrl: "./change-the-password.component.html",
  styleUrls: ["./change-the-password.component.scss"],
})
export class ChangethePasswordComponent implements OnInit {
  changeThePassw: FormGroup;
  saveNewPass: FormGroup;
  message = "";
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toaster: Toaster
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.changeThePassw = this.formBuilder.group({
      //id: new FormControl("", [Validators.required]),
      userName: new FormControl("username", [Validators.required]),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,16}$"
        ),
      ]),
      newPassword: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,16}$"
        ),
      ]),
      confirmNewPassword: new FormControl("", [Validators.required]),
    });
  }
  showToaster(message: string, typea: any) {
    const type = typea;
    this.toaster.open({
      text: message,
      caption: "Status",
      type: type,
      duration: 3000,
    });
  }
  changeThePass() {
    const userinfo = JSON.parse(localStorage.getItem("auth-user"));
    const user = userinfo.sub;
    this.changeThePassw.value.userName = user;
    this.userService.changeThePassword(this.changeThePassw.value).subscribe(
      (data) => {
        if (data.body.status == "BAD_REQUEST") {
          this.showToaster("Mật khẩu hiện tại sai", "danger");
        }
        if (data.body.status == "OK") {
          this.showToaster("Đổi mật khẩu thành công", "success");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
