import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
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
    private userService: UserService
  ) {}

  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.changeThePassw = this.formBuilder.group({
      //id: new FormControl("", [Validators.required]),
      userName: new FormControl("", [Validators.required]),
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

  changeThePass() {
    const userinfo = JSON.parse(localStorage.getItem("auth-user"));
    const user = userinfo.sub;
    this.changeThePassw.value.userName = user;
    this.userService.changeThePassword(this.changeThePassw.value).subscribe(
      (data) => {
        if (data.body.status == "BAD_REQUEST") {
          this.message = "Mật khẩu hiện tại sai";
        }
        if (data.body.status == "OK") {
          this.message = "Đổi mật khẩu thành công";
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
