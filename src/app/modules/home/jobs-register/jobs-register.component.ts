import { Component, OnInit } from "@angular/core";
import { JobService } from "../../../@core/services/job.service";
import { Router } from "@angular/router";
import { JobRegisterService } from "../../../@core/services/job-register.service";
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: "ngx-jobs-register",
  templateUrl: "./jobs-register.component.html",
  styleUrls: ["./jobs-register.component.scss"],
})
export class JobsRegisterComponent implements OnInit {
  pageNo = 0;
  pageSize = 2;
  totalPage = 0;
  totalJob = 0;
  listJobsRegister: any;
  totalPageNumRe: Number[] = [];
  totalPageNum: Number[] = [];
  index: Number[] = [];
  sortBy = "dateRegister";
  sortSearchBy = "due_date";
  sortDir = "asc";
  isClick = false;
  isSearch=false;
  constructor(
    private jobRegisterService: JobRegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jobRegisterService
    .getAllJobRegister(this.pageNo, this.pageSize, this.sortBy, this.sortDir)
    .subscribe((data) => {
      this.getData(data);
    });
  }

  getData(data) {
    const start = 0;
    this.listJobsRegister = data.jobsRegisters;
    this.pageNo = data.pageNo;
    this.pageSize = data.pageSize;
    this.totalJob = data.totalElements;
    this.totalPage = data.totalPages;
    this.totalPageNumRe = Array(this.totalPage)
      .fill(1)
      .map((x, i) => i);
    this.totalPageNum = this.totalPageNumRe.slice().reverse();
    this.index = Array(this.listJobsRegister.length)
      .fill(0)
      .map((x, i) => i);
  }

  onClick(page) {
    if (!this.isSearch) {
      this.pageNo = page;
      this.router.navigate(["/home/job-register"]);
      this.jobRegisterService
        .getAllJobRegister(this.pageNo, this.pageSize, this.sortBy, this.sortDir)
        .subscribe((data) => {
          this.getData(data);
        });
      }
    // } else {
    //   const data = {
    //     name: this.name,
    //     pageNo: page,
    //     totalPages: this.totalPage,
    //     pageSize: this.pageSize,
    //     sortBy: this.sortSearchBy,
    //     sortDir: this.sortDir,
    //   };
    //   this.router.navigate(["/home/job"]);
    //   this.jobService.searchJob(data).subscribe((data) => {
    //     this.getData(data);
    //     this.isSearch = true;
    //   });
    // }
      
      }
}
