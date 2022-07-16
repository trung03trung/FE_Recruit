import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RecruitmentService {
  getjob: string;
  getDetailJob: string;
  registerJobUrl: string;
  
  constructor(private http: HttpClient) {  
    this.getjob ="http://localhost:9090/api/public/get-all-job-publick";
    this.getDetailJob ="http://localhost:9090/api/public/job/";
    this.registerJobUrl ="";
  }

  getAllJob(): Observable<any> {
    return this.http.get<any>(this.getjob);
  }

  getDetailJobById(id:number): Observable<any> {
    return this.http.get<any>(this.getDetailJob+ id);
  }

  registerJob(rjob: any): Observable<any> {
    return this.http.post<any>(this.registerJobUrl,rjob);
  }
}