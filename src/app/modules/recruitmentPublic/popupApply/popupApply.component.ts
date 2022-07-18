import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { job } from "../../../@core/models/job";
import { JobRegisterPublic } from "../../../@core/models/jobRegisterPublic";
import { RecruitmentService } from "../../../@core/services/recuitmentP.service";
import { Toaster } from "ngx-toast-notifications";
@Component({
  selector: "ngx-popup-apply",
  templateUrl: "./popupApply.component.html",
  styleUrls: ["./popupApply.component.scss"],
})
export class PopupApply implements OnInit {
  [x: string]: any;
  profileP: FormGroup;
  jobId: any;
  userName: string;
  role: string;
  jobRegPObj: JobRegisterPublic = new JobRegisterPublic();

  checkloggin = false;
  constructor(
    private recruitmentService: RecruitmentService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.jobId = params["id"];
    });
    //console.log(this.jobId);
    this.initForm();
  }
  initForm() {
    this.profileP = this.formBuilder.group({
      pdf: new FormControl("1", [Validators.required]),
      code: new FormControl("", [Validators.required,Validators.maxLength(50)]),
      media_type: new FormControl("", [Validators.required, Validators.maxLength(20)])
    });
  }
  registerJob() {
    const userinfo = JSON.parse(localStorage.getItem("auth-user"));
    if (!userinfo) {
      this.checkloggin = false;
    } else {
      this.role = userinfo.auth;
      this.userName = userinfo.sub;
      if (
        this.role === "ROLE_ADMIN" ||
        this.role === "ROLE_JE" ||
        this.role === "ROLE_USER"
      ) {
        this.checkloggin = true;
        this.jobRegPObj.userName = this.userName;
        //console.log(this.userName);
        //console.log(this.role);
      }
    }
    if (this.jobId || this.checkloggin) {
      this.jobRegPObj.jobId = this.jobId;
      this.jobRegPObj.code = this.profileP.value.code;
      this.jobRegPObj.pdf = this.profileP.value.pdf;
      this.jobRegPObj.media_type = this.profileP.value.media_type;
      console.log(this.profileP.value);
      console.log(this.jobRegPObj);

      this.recruitmentService.registerJob(this.jobRegPObj).subscribe((data) => {
        //console.log(data);
        if (
          data == null ||
          data.status == "NO_CONTENT" ||
          data.status == "NOT_FOUND" ||
          data.status == "500"
        ) {
          this.showToaster("Mời bạn đăng nhập trước khi apply", "danger");
        }
        if (data.status == "OK") {
          this.showToaster("Apple thành công, chúng tôi sẽ liên hệ sớm nhất.", "success");
          this.userDetail.reset();
        }
      });
      
    } else {
      alert("LỖi");
    }
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
