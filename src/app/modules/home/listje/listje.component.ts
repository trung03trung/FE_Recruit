import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Users } from "../../../@core/models/user";
import { UserService } from "../../../@core/services/user.service";

@Component({
  selector: "ngx-listje",
  templateUrl: "./listje.component.html",
  styleUrls: ["./listje.component.scss"],
})
export class ListjeComponent implements OnInit, OnDestroy {
  userDetail!: FormGroup;
  userObj: Users = new Users();
  userList: Users[] = [];
  message = "";

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }

  ngOnInit(): void {
    this.getAllUserJe();
    this.initForm();
  }
  initForm() {
    this.userDetail = this.formBuilder.group({
      id: new FormControl("", [Validators.required]),
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phoneNumber: new FormControl("", [
        Validators.required,
        Validators.pattern("(84|0[3|5|7|8|9])+([0-9]{8})\\b"),
      ]),
      userName: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,16}$"
        ),
      ]),
      confirmPassword: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,16}$"
        ),
      ]),
      //active: new FormControl('', [Validators.required]),
      // homeTown: new FormControl('', [Validators.required]),
      // avatarName: new FormControl('', [Validators.required]),
      // gender: new FormControl('', [Validators.required]),
      // birthDay: new FormControl('', [Validators.required]),
      //   roles: this.formBuilder.group({
      //     id: new FormControl('', [Validators.required]),
      //     code: new FormControl('', [Validators.required]),
      //     description: new FormControl('', [Validators.required]),
      //     delete: new FormControl('', [Validators.required])
      //     }),
      //   delete: new FormControl('', [Validators.required]),
    });
  }

  getAllUserJe() {
    this.userService.getAllUserJe().subscribe(
      (res) => {
        this.userList = res;
        console.log(res);
      },
      (err) => {
        console.log("error while fetching data.");
      }
    );
  }

  editUser(user: Users) {
    this.userDetail.controls["id"].setValue(user.id);
    this.userDetail.controls["name"].setValue(user.name);
    this.userDetail.controls["email"].setValue(user.email);
    this.userDetail.controls["phoneNumber"].setValue(user.phoneNumber);
    this.userDetail.controls["userName"].setValue(user.userName);
    //this.userDetail.controls["password"].setValue(user.password);
    //this.userDetail.controls["confirmPassword"].setValue(user.password);
  }
  toFormAddUser() {
    console.log(this.userDetail);
  }

  addUser() {
    this.userObj.name = this.userDetail.value.name;
    this.userObj.email = this.userDetail.value.email;
    this.userObj.phoneNumber = this.userDetail.value.phoneNumber;
    this.userObj.userName = this.userDetail.value.userName;
    this.userObj.password = this.userDetail.value.password;
    //this.userObj.active = this.userDetail.value.active;
    this.userService.addUser(this.userObj).subscribe(
      (res) => {
        console.log(res);
        if (res == null) {
          alert("Tài khoản hoặc email đã sử dụng");
        } else {
          alert("Đăng ký tài khoản thành công");
        }
        this.getAllUserJe();
      },
      (err) => {
        console.log(err);
      }
    );
    // this.userService.add(this.userDetail.value).subscribe(data => {
    //   console.log(data);
    // });
  }

  updateUser() {
    this.userObj.id = this.userDetail.value.id;
    this.userObj.name = this.userDetail.value.name;
    this.userObj.password = this.userDetail.value.password;
    this.userObj.email = this.userDetail.value.email;
    this.userObj.phoneNumber = this.userDetail.value.phoneNumber;
    this.userObj.userName = this.userDetail.value.userName;
    this.userService.updateUser(this.userObj).subscribe(
      (res) => {
        console.log(res);
        this.getAllUserJe();
      },
      (error) => {
        console.log(error);
        if (error.status == "500") {
          alert("Tài khoản hoặc số email đã sử dụng.");
        }
      }
    );
  }

  deactivateUser(id: number) {
    this.userObj.id = this.userDetail.value.id;
    console.log(this.userObj);

    //this.userService.deactivateUser(id).subscribe();
  }
}
