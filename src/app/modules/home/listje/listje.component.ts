import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Users } from "../../../@core/models/user";
import { SeachUser } from "../../../@core/models/seachUser";
import { UserService } from "../../../@core/services/user.service";
import { Toaster } from "ngx-toast-notifications";

@Component({
  selector: "ngx-listje",
  templateUrl: "./listje.component.html",
  styleUrls: ["./listje.component.scss"],
})
export class ListjeComponent implements OnInit {
  userDetail!: FormGroup;
  seachU: SeachUser = new SeachUser();
  userObj: Users = new Users();
  userList: Users[];
  message = "";
  pageNumber = [1, 2, 3];
  click = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toaster: Toaster
  ) {}

  ngOnInit(): void {
    this.getAllUserJe();
    this.initForm();
  }
  initForm() {
    this.userDetail = this.formBuilder.group({
      id: new FormControl("id", [Validators.required]),
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
      pageNumber: 1,
      pageSize: 6,
      sortT: "ASC",
      sortColum: "id",
    });
  }

  getAllUserJe() {
    this.seachU.name = "";
    this.seachU.email = "";
    this.seachU.pageNumber = 1;
    this.seachU.userName = "";
    this.seachU.pageSize = 6;
    this.seachU.sortT = "ASC";
    this.seachU.sortColum = "id";
    //console.log(this.userDetail.value.name);

    this.userService.getAllUserJe(this.seachU).subscribe(
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
  }
  seach() {
    this.userService.getAllUserJeForm(this.userDetail.value).subscribe(
      (res) => {
        this.userList = res;
        //console.log(res);
      },
      (err) => {
        console.log("error while fetching data.");
      }
    );
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
    this.userService.addUser(this.userObj).subscribe(
      (res) => {
        console.log(res);
        if (
          res == null ||
          res.status == "NO_CONTENT" ||
          res.status == "NOT_FOUND"||
          res.status == "500"
        ) {
          this.showToaster("Tài khoản hoặc email đã sử dụng", "danger");
        }
        if (res.status == "OK") {
          this.showToaster("Đăng ký tài khoản thành công", "success");
          this.userDetail.reset();

        }
        this.getAllUserJe();
      },
      (err) => {
        console.log(err);
        this.showToaster("Tài khoản hoặc email đã sử dụng", "danger");
      }
    );
  }
  setPage(n: number) {
    this.seachU.pageNumber = n;
    this.seachU.pageSize = 6;
    this.seachU.sortT = "ASC";
    this.seachU.sortColum = "id";
    this.userService.getAllUserJe(this.seachU).subscribe(
      (res) => {
        this.userList = res;
        //console.log(res);
      },
      (err) => {
        console.log("error while fetching data.");
      }
    );
  }
  sortUser() {
    this.seachU.sortColum = "user_name";
    if(!this.click){
      this.seachU.sortT = "DESC";
      this.seachU.sortColum = "user_name";
      this.click = true;
    }
    else{
      this.seachU.sortT = "ASC";
      this.seachU.sortColum = "user_name";
      this.click = false;
    }
    this.userService.getAllUserJe(this.seachU).subscribe(
      (res) => {
        this.userList = res;
        //console.log(res);
      },
      (err) => {
        console.log("error while fetching data.");
      }
    );
  }
  sortPhone() {
    if(!this.click){
      this.seachU.sortT = "DESC";
      this.seachU.sortColum = "phone_number";
      this.click = true;
    }
    else{
      this.seachU.sortT = "ASC";
      this.seachU.sortColum = "phone_number";
      this.click = false;
    }

    this.userService.getAllUserJe(this.seachU).subscribe(
      (res) => {
        this.userList = res;
        //console.log(res);
      },
      (err) => {
        console.log("error while fetching data.");
      }
    );
  }
  sortEmail() {
    if(!this.click){
      this.seachU.sortT = "ASC";
      this.seachU.sortColum = "email";
      this.click = true;
    }
    else{
      this.seachU.sortT = "DESC";
      this.seachU.sortColum = "email";
      this.click = false;
    }
    this.userService.getAllUserJe(this.seachU).subscribe(
      (res) => {
        this.userList = res;
        //console.log(res);
      },
      (err) => {
        console.log("error while fetching data.");
      }
    );
  }
  sortId() {
    if(!this.click){
      this.seachU.sortT = "DESC";
      this.seachU.sortColum = "id";
      this.click = true;
    }
    else{
      this.seachU.sortT = "ASC";
      this.seachU.sortColum = "id";
      this.click = false;
    }
    this.userService.getAllUserJe(this.seachU).subscribe(
      (res) => {
        this.userList = res;
        //console.log(res);
      },
      (err) => {
        console.log("error while fetching data.");
      }
    );
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
        //console.log(res);
        this.getAllUserJe();
        this.showToaster("Update thành công", "success");
      },
      (error) => {
        console.log(error);
        if (error.status == "500") {
          this.showToaster("Tài khoản hoặc số email đã sử dụng.", "danger");
        }
      }
    );
  }

  deactivateUser(id: number, userName: string) {
    //console.log(id);
    this.userObj.id = id;
    this.userObj.userName = userName;
    console.log(this.userObj);
    this.userService.deactivateUser(this.userObj).subscribe((data) => {
      console.log(data);
      this.showToaster("Deactivate User Successfull.", "success");
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
}
