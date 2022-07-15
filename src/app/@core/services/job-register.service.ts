import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable ,throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { job } from '../models/job';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
     Authorization:'Bearer '+localStorage.getItem('auth-token'),
    }),
  };
  
  const httpOptionspdf = {
    headers: new HttpHeaders({
      'Content-Type': 'application/pdf',
     Authorization:'Bearer '+localStorage.getItem('auth-token'),
    }),
  };
  
  @Injectable({
    providedIn: 'root',
  })
  export class JobRegisterService {
      
    listJob:job[]=[];
    index:number;
    job:job;
    token=localStorage.getItem('auth-token');
    private readonly baseUrl = `${environment.apiUrl}admin/`;
  
    constructor(private http: HttpClient, private router: Router) { }
  
    public getAllJobRegister(pageNo:any,pageSize,sortBy,sortDir): Observable<any> {
      return this.http.get(`${this.baseUrl}job-register?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`,httpOptions)
    }
    private handleError(error: HttpErrorResponse) {
      if (error.status === 0) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
          `Backend returned code ${error.status}, body was: `, error.error);
      }
      // Return an observable with a user-facing error message.
      return throwError(() => new Error('Something bad happened; please try again later.'));
    }
    public tranferMail(listJob: job[],index){
      this.listJob = listJob;
      this.index=index;
    }
    public tranferData(job:job){
      this.job=job;
    }
    public getJobRegisterById(id:any):Observable<any>{
      return this.http.get(`${this.baseUrl}job-register/${id}`,httpOptions);
    }

    public getProfileByJobRegister(id:any):Observable<any>{
      return this.http.get(`${this.baseUrl}job-register/profile/${id}`,httpOptions);
    }

    public changeStatus(id:Number,code:string):Observable<any>{
      return this.http.post(`${this.baseUrl}job-register/${id}?code=${code}`,"",httpOptions);
    }

    public rejectJob(id:Number,code:string,reason:String):Observable<any>{
      return this.http.post(`${this.baseUrl}profile-reject/${id}?code=${code}&reason=${reason}`,"",httpOptions);
    }
  }
  