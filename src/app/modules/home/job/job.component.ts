import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { job } from '../../../@core/models/job';
import { JobService } from '../../../@core/services/job.service';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DiaglogFormComponent } from './diaglog-form/diaglog-form.component';

@Component({
  selector: 'ngx-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  pageNo=0;
  pageSize=0;
  totalPage=0;
  totalJob=0;
  listJob: job[]= [];
  totalPageNumRe:Number[]=[];
  totalPageNum:Number[]=[]
  index:Number[]=[];
  // @Output() jobDetail=new EventEmitter<job>();
  constructor(private jobService:JobService,private router:Router,
    private dialog:MatDialog) { }

  ngOnInit(): void {

    
    this.jobService.getAllJob(this.pageNo).subscribe((data=>{
        this.getData(data)
    }));
     
  }

  getData(data){
    const start=0
    this.listJob=data.jobs;
        this.pageNo=data.pageNo;
        this.pageSize=data.pageSize;
        this.totalJob=data.totalElements;
        this.totalPage= data.totalPages;
        this.totalPageNumRe = Array(this.totalPage).fill(1).map((x,i)=>i);
        this.totalPageNum=this.totalPageNumRe.slice().reverse();
        this.index=Array(this.listJob.length).fill(0).map((x,i)=>i);
  }

  onClick(page){
    this.pageNo=page
    this.router.navigate(['/home/job']);
    this.jobService.getAllJob(this.pageNo).subscribe((data=>{
      this.getData(data)
  }));
  }
  // addJobDetail(value:job){
  //   this.jobDetail.emit(value);
  // }
  tranferJob(job:job){
    this.jobService.tranferData(job);
  }
  getDetail(job:job){
    this.router.navigate[`home/job/detail?id=${job.id}`];
  }
  
  openDialog(){
    this.dialog.open(DiaglogFormComponent)
  }
}




