import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
;
import { job } from '../../../@core/models/job';
import { JobService } from '../../../@core/services/job.service';

@Component({
  selector: 'ngx-detail-job',
  templateUrl: './detail-job.component.html',
  styleUrls: ['./detail-job.component.scss']
})
export class DetailJobComponent implements OnInit {
  job:job;
  id:any;
  jobPosition;
  workingForm;
  academicLevel;
  rank;
  statusJob;
  userContact;
  constructor(private route:ActivatedRoute,private jobService:JobService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
      
    });
    this.jobService.getJobById(this.id).subscribe(data=>{
      console.log(data);
      
      this.job=data;
      this.jobPosition=this.job.jobPosition;
      this.workingForm=this.job.workingForm;
      this.academicLevel=this.job.academicLevel;
      this.statusJob=this.job.statusJob;
      this.rank=this.job.rank;
      this.userContact=this.job.userContact;
  });
  }

  
}
