import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  
  @Injectable({
    providedIn: 'root',
  })
  export class ForgotPasswordService {
    private readonly baseUrl = `${environment.apiUrl}auth/`;
  
    constructor(private http: HttpClient, private router: Router) { }
    
    email: string;

    public sendOTP(email: any): Observable<any> {
      return this.http.post(`${this.baseUrl}send-otp?email=${email}`, '');
    }

    public tranferMail(email: string){
      this.email = email;
    }

    public changePassword(data:any):Observable<any>{
      return this.http.post(`${this.baseUrl}change-password`, data);
    }
  }
  