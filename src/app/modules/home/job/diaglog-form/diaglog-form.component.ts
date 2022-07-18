import { Component, DoCheck, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators ,FormBuilder} from "@angular/forms";
import { Users } from "../../../../@core/models/user";
import { JobService } from "../../../../@core/services/job.service";
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatRadioButton } from "@angular/material/radio";
import { Toaster } from "ngx-toast-notifications";
import { Router } from "@angular/router";



@Component({
  selector: "ngx-diaglog-form",
  templateUrl: "./diaglog-form.component.html",
  styleUrls: ["./diaglog-form.component.scss"],
})
export class DiaglogFormComponent implements OnInit,DoCheck {
  jobPosition;
  academicLevel;
  workingForm;
  rank;
  statusJob;
  userContact: Users;
  userCreateName;
  currentDate=new Date();
  disableClick = "disableClick";
  formJob = new FormGroup({
    name: new FormControl(""),
    jobPositionId: new FormControl(""),
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
    
  });
  constructor(
    private jobService: JobService,
    private fb:FormBuilder,
    private toaster:Toaster,
    private route: Router
  ) {}

  ngOnInit(): void {
    const a = JSON.parse(localStorage.getItem("auth-user"));
    this.userCreateName = a.sub;
    this.jobService.getFieldSelect().subscribe((data) => {
      this.jobPosition = data.jobPositions;
      this.academicLevel = data.academicLevels;
      this.workingForm = data.workingForms;
      this.rank = data.ranks;
      this.userContact = data.users;
      console.log(data);
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
  initForm(){
    this.formJob = this.fb.group({
      name:["",[Validators.required,Validators.maxLength(150)]],
      jobPositionId:["",Validators.required],
      numberExperience:["",Validators.required],
      workingFormId:["",Validators.required],
      addressWork:["",Validators.required],
      academicLevelId:["",Validators.required],
      qtyPerson:["",[Validators.required,Validators.pattern('^[0-9]{1,3}$')]],
      rankId:["",Validators.required],
      dueDate:["",Validators.required],
      skills:["",Validators.required],
      description:["",Validators.required],
      salaryMin:["",[Validators.required,Validators.minLength(7),Validators.maxLength(20),Validators.pattern('^[0-9]{7,20}$')]],
      salaryMax:["",[Validators.required,Validators.minLength(7),Validators.maxLength(20),Validators.pattern('^[0-9]{7,20}$')]],
      userContactId:["",Validators.required],
      jobRequirement:["",Validators.required],
      interrest: ["", Validators.required],
      startDate:["",Validators.required],
      userCreate:[this.userCreateName],
    });
  }
  onSubmit() {
    this.formJob.patchValue({ userCreate: this.userCreateName });
    console.log(this.formJob.value);
    
    this.jobService.addNewJob(this.formJob.value).subscribe((data) => {
      if (data != null) {
        this.showToaster('Cập nhật tin tuyển dụng thành công','success');
        this.route.navigate(['home/job'])
      }
      else{
        this.showToaster('Cập nhật tin tuyển dụng thất bại','danger');
      }
    });
  };
  // onNoClick(){
  //   this.dialogRef.close()
  // }
  showToaster(message: string,typea:any) {
    const type = typea;
    this.toaster.open({
      text: message,
      caption: 'Thành công',
      type: type,
      duration: 3000
    });
  }
}
