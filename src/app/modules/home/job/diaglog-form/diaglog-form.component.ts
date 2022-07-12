import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators ,FormBuilder} from "@angular/forms";
import { Users } from "../../../../@core/models/user";
import { JobService } from "../../../../@core/services/job.service";
import { ToastrService } from "ngx-toastr";
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: "ngx-diaglog-form",
  templateUrl: "./diaglog-form.component.html",
  styleUrls: ["./diaglog-form.component.scss"],
})
export class DiaglogFormComponent implements OnInit {
  jobPosition;
  academicLevel;
  workingForm;
  rank;
  statusJob;
  userContact: Users;
  userCreateName;
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
    interest: new FormControl(""),
    salaryMin: new FormControl(""),
    salaryMax: new FormControl(""),
    statusId: new FormControl(""),
    userContactId: new FormControl(""),
    userCreate: new FormControl("userCreate"),
    jobRequirement: new FormControl(""),
    startDate: new FormControl(""),
  });
  constructor(
    private jobService: JobService,
    private toastrService: ToastrService,
    private fb:FormBuilder,
    private dialogRef: MatDialogRef<DiaglogFormComponent>,
  ) {}

  ngOnInit(): void {
    const a = JSON.parse(localStorage.getItem("auth-user"));
    this.userCreateName = a.sub;
    this.jobService.getFieldSelect().subscribe((data) => {
      this.jobPosition = data.jobPositions;
      console.log(data);
      this.academicLevel = data.academicLevels;
      this.workingForm = data.workingForms;
      this.rank = data.ranks;
      this.userContact = data.users;
      this.statusJob = data.statusJobs;
    });
    this.initForm();
  }
  initForm() {
    this.formJob = this.fb.group({
      interest: ["", Validators.required],
    });
  }
  onSubmit() {
    this.formJob.patchValue({ userCreate: this.userCreateName });
    console.log(this.formJob.value);
    this.toastrService.success("Thêm mới tin tuyển dụng thành công");
    this.jobService.addNewJob(this.formJob.value).subscribe((data) => {
      if (data != null) {
        this.toastrService.success("Thêm mới tin tuyển dụng thành công");
      }
    });
  };
  onNoClick(){
    this.dialogRef.close()
  }
}
