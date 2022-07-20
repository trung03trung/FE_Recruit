import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { time } from 'console';
import { Toaster } from 'ngx-toast-notifications';
import { JobRegisterService } from '../../../../../@core/services/job-register.service';

@Component({
  selector: 'ngx-dialog-interveiw',
  templateUrl: './dialog-interveiw.component.html',
  styleUrls: ['./dialog-interveiw.component.scss']
})
export class DialogInterveiwComponent implements OnInit {
  licensed = "none";
  method;
  loading = "";
  currentDate=new Date().getTime();
  date:Date;
  formInterview=new FormGroup({
    id: new FormControl(""),
    dateInterview: new FormControl(""),
    timeInterview:new FormControl(""),
    methodInterview: new FormControl(""),
    mediaType: new FormControl(""),
  });
  constructor( private fb:FormBuilder,
              private toaster:Toaster,
              private route: Router,
              private dialogRef: MatDialogRef<DialogInterveiwComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any,
              private jobRegisterService:JobRegisterService,) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.formInterview = this.fb.group({
      id:[this.data.id],
      dateInterview:["",Validators.required],
      timeInterview:["",Validators.required],
      methodInterview:["",Validators.required],
      mediaType:[""],
    });
    
  }
  changeGender(e:any){
    this.method=e.target.value;
    console.log(this.method);
  }
  
  openCombobox() {
    this.licensed = "block";
    this.formInterview.controls.mediaType.setValue("Skype");
  }
  closeCombobox() {
    this.licensed = "none";
    this.formInterview.controls.mediaType.setValue("");
  }
  onNoclick(){
    this.dialogRef.close();
  }

  sheduleInterview(){
    console.log(this.formInterview.controls.timeInterview.value)
    if(this.formInterview.valid)
      this.loading = "spinner-border spinner-border-sm";
    this.jobRegisterService.sendEmailInterview(this.formInterview.value).subscribe(data=>{
      if(data.status=='OK'){
        this.dialogRef.close();
        this.showToaster('Đặt lịch phỏng vấn thành công','success');
        
      }
      else{
        this.showToaster('Đặt lịch phỏng vấn thất bại','danger');
        this.loading = "";
      }
    })
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
  validateDate(){
    this.date=this.formInterview.controls.dateInterview.value;
    const datetmp=new Date(this.date)
    if(datetmp.getTime()<this.currentDate)
        return true;
    else
        return false;
  }
}
