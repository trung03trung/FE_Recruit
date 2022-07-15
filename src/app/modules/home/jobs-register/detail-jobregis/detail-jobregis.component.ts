import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Toaster } from 'ngx-toast-notifications';
import { JobRegisterService } from '../../../../@core/services/job-register.service';
import { DialogRejectComponent } from '../../detail-job/dialog-reject/dialog-reject.component';

@Component({
  selector: 'ngx-detail-jobregis',
  templateUrl: './detail-jobregis.component.html',
  styleUrls: ['./detail-jobregis.component.scss']
})
export class DetailJobregisComponent implements OnInit {
  jobRegister:any;
  job:any;
  profile;
  statusJobRegister;
  user;
  id;
  constructor(private route:ActivatedRoute,
              private jobRegisterService:JobRegisterService,
              private toaster: Toaster,
              private dialog:MatDialog,
              ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getJobRegisterById();
    this.getProfileByJobRegister();
  }
  showToaster(message: string,typea:any) {
    const type = typea;
    this.toaster.open({
      text: message,
      caption: 'Thành công',
      type: type,
      duration: 3000
    });
  }
  getJobRegisterById(){
    this.jobRegisterService.getJobRegisterById(this.id).subscribe(data=>{
      console.log(data);
      this.jobRegister=data;
     
      this.job=data.job;
      this.statusJobRegister=data.statusJobRegister;
      this.user=data.user;
      this.getProfileByJobRegister()
  });
  }
  getProfileByJobRegister(){
    this.jobRegisterService.getProfileByJobRegister(this.id).subscribe(data=>{
      this.profile=data;
    });
  }

  statusAccept(status:string){
    this.jobRegisterService.changeStatus(this.id,status).subscribe(data=>{
      if(data.status=='OK'){
        this.getJobRegisterById();
        this.showToaster('Xét duyệt thành công','success');
      }
      else{
        this.showToaster('Xét duyệt thất bại','danger');
        }
    });
  }
  openDialogReject(){
    const data1={job:this.jobRegister,isJobregister:true}
    const dialogRef=this.dialog.open(DialogRejectComponent,{
      data:data1,
    });
    dialogRef.afterClosed().subscribe(data=>this.getJobRegisterById());
  }
}
