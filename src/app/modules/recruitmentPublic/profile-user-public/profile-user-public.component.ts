import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PrimeNGConfig } from "primeng/api";
import { SessionService } from "../../../@core/services/session.service";
import { User } from "../../home/profile/profile.model";
import { ProfileService } from "../../home/profile/profile.service";

@Component({
  selector: "ngx-profile-user-public",
  templateUrl: "./profile-user-public.component.html",
  styleUrls: ["./profile-user-public.component.scss"],
})
export class ProfileUserPublicComponent implements OnInit {
  [x: string]: any;
  formProfile: FormGroup;
  user: User;
  userName: any;

  constructor(
    private sessionService: SessionService,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getByUserName();
    this.initForm();
  }
  initForm() {
    this.formProfile = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      birthDay: ['', Validators.required],
      homeTown: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  getByUserName(){
    const userinfo = JSON.parse(localStorage.getItem('auth-user'));
    const name = userinfo.sub;
    console.log(name);

    this.profileService.getProfile(name).subscribe(
      (res)=>{
        this.updateForm(res);
        console.log(res);
      },
    );
  }

  updateForm(user: User): void {
    this.formProfile.patchValue({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      birthDay: user.birthDay,
      homeTown: user.homeTown,
      gender: user.gender,
    });
  }
}
