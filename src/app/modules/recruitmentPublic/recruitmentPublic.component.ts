import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { job } from "../../@core/models/job";
import { RecruitmentService } from "../../@core/services/recuitmentP.service";

@Component({
  selector: "ngx-recruitment-public",
  templateUrl: "./recruitmentPublic.component.html",
  styleUrls: ["./recruitmentPublic.component.scss"],
})
export class RecruitmentPublicComponent implements OnInit {
  jobDetail: FormGroup;
  jobObj: job = new job();
  jobList: job[];
  pageNumber = [1, 2, 3];
  constructor(
    private formBuilder: FormBuilder,
    private recuitmentse: RecruitmentService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllJobPublic() 
  }
  initForm() {}

  getAllJobPublic() {
    this.recuitmentse.getAllJob().subscribe(
      (data) => {
        this.jobList = data;
        console.log(data);
      },
      (err) => {
        console.log("error while fetching data.");
      }
    );
  }
}
