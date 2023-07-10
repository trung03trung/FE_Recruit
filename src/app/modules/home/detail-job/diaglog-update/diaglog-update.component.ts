import { Component, DoCheck, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators ,FormBuilder} from "@angular/forms";
import { Users } from "../../../../@core/models/user";
import { JobService } from "../../../../@core/services/job.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Toaster } from "ngx-toast-notifications";
import { Router } from "@angular/router";
import { DatePipe, formatDate } from '@angular/common' 

@Component({
  selector: "ngx-diaglog-update",
  templateUrl: "./diaglog-update.component.html",
  styleUrls: ["./diaglog-update.component.scss"],
})
export class DiaglogUpdateComponent implements OnInit,DoCheck {
  jobPosition;
  academicLevel;
  workingForm;
  rank;
  statusJob;
  userContact: Users;
  userCreateName;
  jpSelect = '';
  companies;
  disableClick = "disableClick";
  dueDateFormat='';
  data=this.jobService.data;
  currentDate=new Date();
  formJob = new FormGroup({
    id:new FormControl(this.data.name),
    name: new FormControl(this.data.name),
    jobPositionId: new FormControl(),
    numberExperience: new FormControl(""),
    workingFormId: new FormControl(""),
    addressWork: new FormControl(""),
    academicLevelId: new FormControl(""),
    qtyPerson: new FormControl(""),
    rankId: new FormControl(""),
    dueDate: new FormControl(""),
    skills: new FormControl(""),
    description: new FormControl(""),
    interrest: new FormControl(""),
    salaryMin: new FormControl(""),
    salaryMax: new FormControl(""),
    userContactId: new FormControl(""),
    userCreate: new FormControl("userCreate"),
    jobRequirement: new FormControl(""),
    startDate: new FormControl(""),
    companyId: new FormControl(""),
    
  });
  constructor(
    private jobService: JobService,
    private fb:FormBuilder,
    private toaster:Toaster,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.jpSelect = this.data.jobPosition.code;
    const a = JSON.parse(localStorage.getItem("auth-user"));
    this.userCreateName = a.sub;
    this.jobService.getFieldSelect().subscribe((data) => {
      this.jobPosition = data.jobPositions;
      this.academicLevel = data.academicLevels;
      this.workingForm = data.workingForms;
      this.rank = data.ranks;
      this.userContact = data.users;
      this.companies = data.companies;
    });
    this.initForm();
  }
  ngDoCheck(): void {
    if (this.formJob.valid) {
      this.disableClick = '';
    } else {
      this.disableClick = 'disableClick';
    }
  }
  initForm() {
    
  
    
    this.formJob = this.fb.group({
      id:[this.data.id],
      name:[this.data.name,[Validators.required,Validators.maxLength(150)]],
      jobPositionId:['',Validators.required],
      numberExperience:[this.data.numberExperience,Validators.required],
      workingFormId:["",Validators.required],
      addressWork:[this.data.addressWork,Validators.required],
      academicLevelId:["",Validators.required],
      qtyPerson:[this.data.qtyPerson,[Validators.required,Validators.pattern('^[0-9]{1,3}$')]],
      rankId:["",Validators.required],
      dueDate:[formatDate(this.data.dueDate, 'yyyy-MM-dd', 'en'),Validators.required],
      skills:[this.data.skills,Validators.required],
      description:[this.data.description,Validators.required],
      salaryMin:[this.data.salaryMin,[Validators.required,Validators.minLength(7),Validators.maxLength(20),Validators.pattern('^[0-9]{7,20}$')]],
      salaryMax:[this.data.salaryMax,[Validators.required,Validators.minLength(7),Validators.maxLength(20),Validators.pattern('^[0-9]{7,20}$')]],
      userContactId:["",Validators.required],
      jobRequirement:[this.data.jobRequirement,Validators.required],
      interrest: [this.data.interrest, Validators.required],
      startDate:[formatDate(this.data.startDate, 'yyyy-MM-dd', 'en'),Validators.required],
      userCreate:[this.userCreateName],
      companyId:["",Validators.required],
    });
  }
  onSubmit() {
    const date1=new Date(this.formJob.controls.dueDate.value);
    const date2=new Date(this.formJob.controls.startDate.value);
  
    this.formJob.patchValue({ 
      userCreate: this.userCreateName
     });
    this.jobService.addNewJob(this.formJob.value).subscribe((data) => {
      if (data != null) {
        this.showToaster('Cập nhật tin tuyển dụng thành công','success');
          this.router.navigate(['home/job']);
      }
      else
      this.showToaster('Cập nhật tin tuyển dụng thất bại','danger');
    });
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
  onClose(){
    this.router.navigate(['home/job/detail/'+this.data.id])
  }
}
