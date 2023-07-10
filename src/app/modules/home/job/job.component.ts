import { Component, OnInit, ViewChild} from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {TextBook} from '../../../@core/models/textBook.model';
import {JobService} from '../../../@core/services/job.service';


@Component({
  selector: 'ngx-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  displayedColumns = ['id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<TextBook>;
  pageNumber = 0;
  pageSize = 5;
  sortBy = 'name';
  sortDir = 'asc';
  keyword = '';
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild(MatSort) sort: MatSort;

  constructor(private jobService: JobService,
  ) {}

  ngOnInit(): void {
    this.getDataSource();
  }

  getDataSource(){
    this.jobService.searchTextBook(this.keyword,this.pageNumber,this.pageSize,this.sortBy,this.sortDir).subscribe(
      (res) => {
       this.dataSource = new MatTableDataSource(res.content);
      },
    );
  }
}
