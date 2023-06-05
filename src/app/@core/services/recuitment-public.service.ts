import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { JobRegisterPublic } from "../models/jobRegisterPublic";

const httpOptionsFD = {
  headers: new HttpHeaders({
   Authorization:'Bearer '+localStorage.getItem('auth-token'),
  }),
};

@Injectable({
  providedIn: "root",
})

export class RecruitmentService {
  getjob: string;
  getDetailJob: string;
  registerJobUrl: string;
  
  constructor(private http: HttpClient) {  
    this.getjob ="http://localhost:9090/api/public/get-job";
    this.getDetailJob ="http://localhost:9090/api/public/job/";
    this.registerJobUrl ="http://localhost:9090/api/public/register-job-public";
  }

  getAllJob(type:string): Observable<any> {
    return this.http.get<any>(`${this.getjob}?type=${type}`);
  }

  getDetailJobById(id:number): Observable<any> {
    return this.http.get<any>(this.getDetailJob+id);
  }

  registerJob(data:any): Observable<any> {
    return this.http.post<any>(this.registerJobUrl,data,httpOptionsFD);
  }
}