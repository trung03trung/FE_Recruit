import { NumberSymbol } from '@angular/common';
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
export class JobService {
    
  listJob:job[]=[];
  index:number;
  job:job;
  token=localStorage.getItem('auth-token');
  private readonly baseUrl = `${environment.apiUrl}admin/`;

  constructor(private http: HttpClient, private router: Router) { }

  public getAllJob(pageNo:any,pageSize,sortBy,sortDir): Observable<any> {
    return this.http.get(`${this.baseUrl}job?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`,httpOptions)
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
  public getJobById(id:any):Observable<any>{
    return this.http.get(`${this.baseUrl}job/${id}`,httpOptions).pipe(catchError(this.handleError));
  }
  public getFieldSelect():Observable<any>{
    return this.http.get(`${this.baseUrl}select`,httpOptions);
  }
  public addNewJob(form:any):Observable<any>{
    return this.http.post(`${this.baseUrl}job`, form,httpOptions);
  }
  public exportPDF(id:any):Observable<any>{
    return this.http.get(`${this.baseUrl}pdf/${id}?token=${this.token}`,httpOptionspdf);
  }
  public changeStatus(id:Number,code:string):Observable<any>{
    return this.http.post(`${this.baseUrl}job/${id}?code=${code}`,"",httpOptions);
  }
  public rejectJob(id:Number,code:string,reason:String):Observable<any>{
    return this.http.post(`${this.baseUrl}job-reject/${id}?code=${code}&reason=${reason}`,"",httpOptions);
  }

  public deleteJobById(id:Number):Observable<any>{
    return this.http.delete(`${this.baseUrl}job/${id}`,httpOptions);
  }

  public searchJob(data:any):Observable<any>{
    return this.http.post(`${this.baseUrl}job/search`,data,httpOptions);
  }
}
