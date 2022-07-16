import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { job } from "../../../@core/models/job";
import { RecruitmentService } from "../../../@core/services/recuitmentP.service";
@Component({
  selector: "ngx-detailJob",
  templateUrl: "./detailJob.component.html",
  styleUrls: ["./detailJob.component.scss"],
})
export class DetaileJobPComponent implements OnInit {
  [x: string]: any;
  id:any;
  data:any;
  jobObj: job = new job();
  workingForm:any;

  constructor(private router:ActivatedRoute,private recruitmentService:RecruitmentService) {
    
  }
  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getJobDetail();
    console.log(this.data);   
    
  }
  initForm() {}

  getJobDetail(){
    if(this.id){
      this.recruitmentService.getDetailJobById(this.id).subscribe(data=>{
          console.log(data);
          this.data = data;
          this.jobObj = data;
          this.workingForm = data.workingForm
          console.log(this.jobObj); 
      })
    }else{
        alert("LỖi")
    }
  }

}
