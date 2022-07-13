import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators ,FormBuilder} from "@angular/forms";
import { job } from '../../../@core/models/job';
import { JobService } from '../../../@core/services/job.service';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DiaglogUpdateComponent } from './diaglog-update/diaglog-update.component';

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
  constructor(private route:ActivatedRoute,private jobService:JobService,
    private dialog:MatDialog) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
      
    });
    const a = JSON.parse(localStorage.getItem("auth-user"));
    this.role = a.auth;
    console.log(this.role);
    
    this.jobService.getJobById(this.id).subscribe(data=>{
      console.log(data);
      
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
    this.dialog.open(DiaglogUpdateComponent,{
      data:this.job,
    })
  }
  statusAccept(){
    this.jobService.changeStatus(this.id,'Chưa đăng tuyển').subscribe(data=>{
        if(data.status=='OK')
          alert("Xét duyệt thành công");
          else{
            alert("Lỗi")
          }
    });
  }
  
}
