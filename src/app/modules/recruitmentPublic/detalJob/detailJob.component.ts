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
@Component({
  selector: "ngx-detailJob",
  templateUrl: "./detailJob.component.html",
  styleUrls: ["./detailJob.component.scss"],
})
export class DetaileJobPComponent implements OnInit {
  [x: string]: any;
  jobId: any;
  data: any;
  jobObj: job = new job();
  workingForm: any;
  profileP: FormGroup;
  userName: string;
  role: string;
  jobRegPObj: JobRegisterPublic = new JobRegisterPublic();

  checkloggin = false;

  constructor(
    private router: ActivatedRoute,
    private recruitmentService: RecruitmentService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.jobId = params["id"];
    });

    this.getJobDetail();
    this.initForm();
    console.log(this.data);
  }
  initForm() {
    this.profileP = this.formBuilder.group({
      pdf: new FormControl("1", [Validators.required]),
      code: new FormControl("", [
        Validators.required,
        Validators.maxLength(50),
      ]),
      media_type: new FormControl("", [
        Validators.required,
        Validators.maxLength(20),
      ]),
    });
  }

  getJobDetail() {
    if (this.jobId) {
      this.recruitmentService.getDetailJobById(this.jobId).subscribe((data) => {
        console.log(data);
        this.data = data;
        this.jobObj = data;
        //this.workingForm = data.workingForm
        //console.log(this.jobObj);
      });
    } else {
      alert("LỖi");
    }
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
          this.showToaster(
            "Apple thành công, chúng tôi sẽ liên hệ sớm nhất.",
            "success"
          );
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
