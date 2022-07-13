import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { job } from '../../../@core/models/job';
import { JobService } from '../../../@core/services/job.service';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DiaglogFormComponent } from './diaglog-form/diaglog-form.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormControl, FormGroup, Validators ,FormBuilder} from "@angular/forms";

@Component({
  selector: 'ngx-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  pageNo=0;
  pageSize=2;
  totalPage=0;
  totalJob=0;
  listJob: job[]= [];
  totalPageNumRe:Number[]=[];
  totalPageNum:Number[]=[]
  index:Number[]=[];
  sortBy='dueDate';
  sortDir='asc';
  isClick=false;
  statusJob;
  // @Output() jobDetail=new EventEmitter<job>();
  constructor(private jobService:JobService,private router:Router,
    private dialog:MatDialog) { }

  ngOnInit(): void {

    
    this.jobService.getAllJob(this.pageNo,this.pageSize,this.sortBy,this.sortDir).subscribe((data=>{
        this.getData(data)
        console.log(data);
        
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
    this.pageNo=page;
    this.router.navigate(['/home/job']);
    this.jobService.getAllJob(this.pageNo,this.pageSize,this.sortBy,this.sortDir).subscribe((data=>{
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
  sortByName(){
    if(!this.isClick){
      this.sortDir='desc';
      this.isClick=true;
    }
    else{
      this.sortDir='asc';
      this.isClick=false;
    }
    this.sortBy="name";
    this.jobService.getAllJob(this.pageNo,this.pageSize,this.sortBy,this.sortDir).subscribe((data=>{
      this.getData(data)
  }));
  }
  sortByDueDate(){
    if(!this.isClick){
      this.sortDir='desc';
      this.isClick=true;
    }
    else{
      this.sortDir='asc';
      this.isClick=false;
    }
    this.sortBy="dueDate";
    this.jobService.getAllJob(this.pageNo,this.pageSize,this.sortBy,this.sortDir).subscribe((data=>{
      this.getData(data)
  }));
  }
  exportPDF(id){
    this.jobService.exportPDF(id).subscribe((data =>{
        console.log(data);
    }));
  }
  changePageSize(e){
    this.jobService.getAllJob(this.pageNo,e.target.value,this.sortBy,this.sortDir).subscribe((data=>{
      this.getData(data)
  }));
  }
}




