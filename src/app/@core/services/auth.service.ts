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
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}auth/`;

  constructor(private http: HttpClient, private router: Router) { }

  public login(form: any): Observable<any> {
    return this.http.post(`${this.baseUrl}login`, form);
  }
  public signup(form: any): Observable<any> {
    return this.http.post(`${this.baseUrl}signup`, form);
  register(name: string, email: string, password: string/*,user_name:string, phone_number: string,home_town:string,avatar: string, gender:string, birth_day: Date,is_delete: boolean */): Observable<any> {
    return this.http.post(`${this.baseUrl}signup`, {
      name,
      email,
      password,
      /*user_name,
      phone_number,
      home_town,
      avatar,
      gender,
      birth_day,
      is_delete*/
    }, httpOptions);
  }
}
