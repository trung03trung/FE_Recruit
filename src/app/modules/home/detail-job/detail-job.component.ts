import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { job } from '../../../@core/models/job';
import { JobService } from '../../../@core/services/job.service';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DiaglogUpdateComponent } from './diaglog-update/diaglog-update.component';
import { DialogRejectComponent } from './dialog-reject/dialog-reject.component';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'ngx-detail-job',
  templateUrl: './detail-job.component.html',
  styleUrls: ['./detail-job.component.scss']
})
export class DetailJobComponent implements OnInit {
  job:job;
  id:any;
  jobPosition;
  workingForm;
  academicLevel;
  rank;
  statusJob;
  userContact;
  role='';
  constructor(
    private route:ActivatedRoute,
    private jobService:JobService,
    private dialog:MatDialog,
    private router:Router,
    private toaster: Toaster
    ) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    const a = JSON.parse(localStorage.getItem("auth-user"));
    this.role = a.auth;
    console.log(this.role);
    this.geJobById();
  }
  geJobById(){
    this.jobService.getJobById(this.id).subscribe(data=>{
      this.job=data;
      this.jobPosition=this.job.jobPosition;
      this.workingForm=this.job.workingForm;
      this.academicLevel=this.job.academicLevel;
      this.statusJob=this.job.statusJob;
      this.rank=this.job.rank;
      this.userContact=this.job.userContact;
  });
  }

  openDialog(){
    const dialogRef=this.dialog.open(DiaglogUpdateComponent,{
      data:this.job,
    });
    dialogRef.afterClosed().subscribe(data=>this.geJobById());
  };

  openDialogReject(){
    const dialogRef=this.dialog.open(DialogRejectComponent,{
      data:this.job,
    })
    dialogRef.afterClosed().subscribe(data=>this.geJobById());
  };

  showToaster(message: string,typea:any) {
    const type = typea;
    this.toaster.open({
      text: message,
      caption: 'Thành công',
      type: type,
      duration: 3000
    });
  }

  statusAccept(){
    this.jobService.changeStatus(this.id,'Chưa đăng tuyển').subscribe(data=>{
      if(data.status=='OK'){
        this.geJobById();
        this.showToaster('Xét duyệt thành công','success');
      }
      else{
        this.showToaster('Xét duyệt thất bại','danger');
        }
    });
  }

  statusRecruit(){
    this.jobService.changeStatus(this.id,'Đang tuyển').subscribe(data=>{
      if(data.status=='OK'){
        this.geJobById();
        this.showToaster('Xét duyệt thành công','success');
      }
      else{
        this.showToaster('Xét duyệt thất bại','danger');
        }
    });
  }
  statusStopRecruit(){
    this.jobService.changeStatus(this.id,'Đang không tuyển').subscribe(data=>{
      if(data.status=='OK'){
        this.geJobById();
        this.showToaster('Xét duyệt thành công','success');
      }
      else{
        this.showToaster('Xét duyệt thất bại','danger');
        }
    });
  }
  statusClosed(){
    this.jobService.changeStatus(this.id,'Đã đóng').subscribe(data=>{
      if(data.status=='OK'){
        this.geJobById();
        this.showToaster('Xét duyệt thành công','success');
      }
      else{
        this.showToaster('Xét duyệt thất bại','danger');
        }
    });
  }
  deleteJob(){
    this.jobService.deleteJobById(this.id).subscribe(data=>{
      if(data.status=='OK'){
        this.showToaster('Xóa  thành công','success');
        this.router.navigate(['home/job']);
      }
      else{
        this.showToaster('Xóa thất bại','danger');
        }
    });
  }
}
