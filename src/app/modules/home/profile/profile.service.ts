import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
   Authorization:'Bearer '+localStorage.getItem('auth-token'),
  }),
}
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly profileAPI = `${environment.apiUrl}admin/user-profile?userName=`;

  constructor(private http: HttpClient) { }
  
  getProfile(username: any):Observable<any>{
    return this.http.get<any>(this.profileAPI + username,httpOptions)
  }
  updateProfile(user: any):Observable<any>{
    return this.http.put(`${environment.apiUrl}admin/user/update`,user,httpOptions);
  }
  viewImage(name:string):Observable<any>{
    return this.http.get(`${environment.apiUrl}admin/image/`+name,httpOptions);
  }

  uploadImage(data,avatar):Observable<any>{
    return this.http.post(`${environment.apiUrl}admin/upload/image/`+avatar,data,httpOptions);
  }
}
