import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { job } from '../../../@core/models/job';
import { JobRegisterPublic } from '../../../@core/models/jobRegisterPublic';
import { RecruitmentService } from '../../../@core/services/recuitment-public.service';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ngx-detailJob',
  templateUrl: './detail-job-public.component.html',
  styleUrls: ['./detail-job-public.component.scss'],
})
export class DetaileJobPComponent implements OnInit {
  fileToUpload:File;
  jobId: any;
  data: any;
  jobObj: job = new job();
  workingForm: any;
  formApply= new FormGroup({
    descriptionYourself:new FormControl(""),
    cvFile :new FormControl(""),
  });
  userName: string;
  role: string;
  jobRegPObj: JobRegisterPublic = new JobRegisterPublic();
  base64 = 'data:image/jpeg;base64,';
  checkloggin = false;

  constructor(
    private router: ActivatedRoute,
    private recruitmentService: RecruitmentService,
    private formBuilder: FormBuilder,
    private toaster: Toaster,
    private httpClient: HttpClient,
  ) {}
  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.jobId = params['id'];
    });

    this.getJobDetail();
    this.initForm();
    this.checkuser();
  }
  initForm() {
    this.formApply = this.formBuilder.group({
      descriptionYourself:[""],
      cvFile :[""],
    });
  }
  getJobDetail() {
    if (this.jobId) {
      this.recruitmentService.getDetailJobById(this.jobId).subscribe((data) => {
        this.data = data;
        this.jobObj = data;
        console.log(data);
      });
    } else {
      alert('LỖi');
    }
  }
 
  registerJob() {
    const userinfo = JSON.parse(localStorage.getItem('auth-user'));
    if (!userinfo || userinfo === undefined) {
      this.showToaster(
        'Bạn cần đăng nhập để ứng tuyển',
        'danger',
      );
    } else {
      const formData=new FormData();
      formData.append("jobId",this.jobId);
      formData.append("cvFile",this.fileToUpload,this.fileToUpload.name)
      console.log(formData.get("jobId"))
      this.recruitmentService.registerJob(formData).subscribe(
        (data) => {
          console.log(data);
          // eslint-disable-next-line eqeqeq
          if (data.status == 'OK') {
            this.showToaster(
              'Apple thành công, chúng tôi sẽ liên hệ sớm nhất.',
              'success',
            );
          } else {
            this.showToaster(
              'Apple không thành công thành công, chúng tôi sẽ liên hệ sớm nhất.',
              'danger',
            );
          }
        },
        (error) => {
          console.log(error);
          // eslint-disable-next-line eqeqeq
          if (error.status == '500') {
            this.showToaster('Mỗi một job chỉ được apply 1 lần.', 'danger');
          }
        },
      );
    }
  }
  onSelect(file: File) {
    this.fileToUpload = file[0];
  }

  showToaster(message: string, typea: any) {
    const type = typea;
    this.toaster.open({
      text: message,
      caption: 'Status',
      type,
      duration: 3000,
    });
  }

  checkuser(){
    const userinfo = JSON.parse(localStorage.getItem('auth-user'));
    if(!userinfo){
      this.checkloggin =false;
    }
    else{
      const role = userinfo.auth;
      const sub = userinfo.sub;
      this.checkloggin = true;
      this.userName = sub;

    }
  }
}
