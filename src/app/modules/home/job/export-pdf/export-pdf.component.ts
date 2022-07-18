import { Component, ElementRef, Input, OnInit, Output, ViewChild,EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import { job } from '../../../../@core/models/job';
import { JobService } from '../../../../@core/services/job.service';
import html2canvas from 'html2canvas';


@Component({
  selector: 'ngx-export-pdf',
  templateUrl: './export-pdf.component.html',
  styleUrls: ['./export-pdf.component.scss']
})
export class ExportPdfComponent implements OnInit {
  id:any; 
  @Input() job:job;
  jobPosition;
  workingForm;
  academicLevel;
  rank;
  statusJob;
  userContact;
 
  @ViewChild('jobTable') jobTable!: ElementRef;
  constructor( private route:ActivatedRoute,
            private jobService:JobService,) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    const a = JSON.parse(localStorage.getItem("auth-user"));
    this.jobPosition=this.job.jobPosition;
    this.workingForm=this.job.workingForm;
    this.academicLevel=this.job.academicLevel;
    this.statusJob=this.job.statusJob;
    this.rank=this.job.rank;
    this.userContact=this.job.userContact;
    // this.geJobById();
    console.log(this.job);
    this.openPDF();
  }
  geJobById(){
    this.jobService.getJobById(this.id).subscribe(data=>{
      this.job=data;
      this.jobPosition=this.job.jobPosition;
      this.workingForm=this.job.workingForm;
      this.academicLevel=this.job.academicLevel;
      this.statusJob=this.job.statusJob;
      this.rank=this.job.rank;
      this.userContact=this.job.userContact;
  });
  }
  public openPDF(): void {
    const DATA: any = document.getElementById('job-table');
    html2canvas(DATA).then((canvas) => {
      const fileWidth = 208;
      const fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      const PDF = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(this.job.name + '.pdf');
    });
  }

}
