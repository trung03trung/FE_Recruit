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
<<<<<<< HEAD
  }
=======
}
>>>>>>> 0e5c57e84c54e74b337fd804b5f9576eca658de7
}
