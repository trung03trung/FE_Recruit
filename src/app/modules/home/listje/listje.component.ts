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
  userDetail !: FormGroup;
  userObj: Users = new Users();
  userList: Users[] = [];

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
      // id: new FormControl(["", [Validators.required]]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
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
        //console.log(res);
      },
      (err) => {
        console.log("error while fetching data.");
      }
    );
  }

  editUser(user: Users) {
    // this.userDetail.controls['id'].setValue(user.id);
    // this.userDetail.controls['name'].setValue(user.name);
    // this.userDetail.controls['email'].setValue(user.email);
  }
  toFormAddUser(){
    console.log(this.userDetail);
  }

  addUser() {
    // alert("Employee deleted successfully");
    //console.log(this.userDetail);
    
    this.userObj.name = this.userDetail.value.name;
    this.userObj.email = this.userDetail.value.email;
    this.userObj.phoneNumber = this.userDetail.value.phoneNumber;
    this.userObj.userName = this.userDetail.value.userName;
    this.userObj.password = this.userDetail.value.password;
    //this.userObj.active = this.userDetail.value.active;
    // this.userService.addUser(this.userObj).subscribe(
    //   (res) => {
    //     console.log(res);
    //     this.getAllUserJe();
    //   },
    //   (err) => {
    //     //console.log(err);
    //   }
    // );

    this.userService.add(this.userDetail.value).subscribe(data => {
      console.log(data);
    });
  }

  updateUser() {
    // this.empObj.id = this.empDetail.value.id;
    // this.empObj.name = this.empDetail.value.name;
    // this.empObj.salary = this.empDetail.value.salary;
    // this.empObj.email = this.empDetail.value.email;
    // this.empService.updateEmployee(this.empObj).subscribe(res=>{
    //   console.log(res);
    //   this.getAllEmployee();
    // },err=>{
    //   console.log(err);
    // })
  }

  deactivateUser(id: number) {
    //alert("User deactivate successfully");
    //console.log(id);
    //this.userService.deactivateUser(id).subscribe();
  }
}
