import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../../../@core/services/job.service';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'ngx-detail-jobregis',
  templateUrl: './detail-jobregis.component.html',
  styleUrls: ['./detail-jobregis.component.scss']
})
export class DetailJobregisComponent implements OnInit {
  jobRegister:any;
  job:any;
  profile;
  statusJobRegister;
  user;
  constructor() { }

  ngOnInit(): void {
  }

}
