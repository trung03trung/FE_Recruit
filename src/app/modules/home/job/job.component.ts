import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { job } from '../../../@core/models/job';
import { JobService } from '../../../@core/services/job.service';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators ,FormBuilder} from "@angular/forms";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'ngx-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  pageNo=0;
  pageSize=5;
  totalPage=0;
  totalJob=0;
  listJob: job[]= [];
  totalPageNumRe:Number[]=[];
  totalPageNum:Number[]=[]
  index:Number[]=[];
  sortBy='dueDate';
  sortSearchBy='due_date'
  sortDir='asc';
  isClick=false;
  statusJob;
  name='';
  isSearch=false;
  constructor(private jobService:JobService,private router:Router,
    private dialog:MatDialog) { }

  ngOnInit(): void {

    
    this.jobService.getAllJob(this.pageNo,this.pageSize,this.sortBy,this.sortDir).subscribe((data=>{
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
    if(!this.isSearch){
    this.pageNo=page;
    this.router.navigate(['/home/job']);
    this.jobService.getAllJob(this.pageNo,this.pageSize,this.sortBy,this.sortDir).subscribe((data=>{
      this.getData(data)
   
      }));
    }
   else{
    const data={name:this.name,pageNo:page,
      totalPages:this.totalPage,pageSize:this.pageSize,
      sortBy:this.sortSearchBy,sortDir:this.sortDir}
    this.router.navigate(['/home/job']);
    this.jobService.searchJob(data).subscribe((data=>{
      this.getData(data)
      this.isSearch=true;
      }));
   }
  }
  // addJobDetail(value:job){
  //   this.jobDetail.emit(value);
  // }
  tranferJob(job:job){
    this.jobService.tranferData(job);
  }
  getDetail(job:job){
    this.router.navigate([`/home/job/detail?id=${job.id}`]);
  }
  openFormAdd(){
    console.log(1);
    this.router.navigate(['/home/job/add']);
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
  // exportPDF(id){
  //   this.jobService.exportPDF(id).subscribe((data =>{
  //       console.log(data);
  //   }));
  // }
  
  public downloadPDF(job):void {
    const doc = new jsPDF();
    // doc.addFileToVFS("Amiri-Regular.ttf", AmiriRegular);
    // doc.addFont("Amiri-Regular.ttf", "Amiri", "normal");
 
    // doc.setFont("Amiri");
    autoTable(doc, {
      styles: { font:'Times-Roman'},
      head: [['Tên công việc', 'Vị trí công việc', 'Mức lương đề xuất','Hạn nộp hồ sơ','Trạng thái']],
      body: [
        [job.name, job.jobPosition.code, job.salaryMax,job.dueDate,job.statusJob.code],
        
      ],
    })
    doc.save('table.pdf')
  }

  changePageSize(e){
    this.jobService.getAllJob(this.pageNo,e.target.value,this.sortBy,this.sortDir).subscribe((data=>{
      this.getData(data)
  }));
  };
  onChangeEvent(event: any){
    const data={name:event.target.value,pageNo:this.pageNo,
      totalPages:this.totalPage,pageSize:this.pageSize,
      sortBy:this.sortSearchBy,sortDir:this.sortDir}
      this.name=event.target.value;
    this.jobService.searchJob(data).subscribe((data=>{
     
      this.getData(data)
      console.log(this.listJob)
      this.isSearch=true;
  }));

  }
}




