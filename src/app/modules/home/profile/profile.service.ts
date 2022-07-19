import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly profileAPI = `${environment.apiUrl}public/user-profile?userName=`;

  constructor(private http: HttpClient) { }
  
  getProfile(username: any):Observable<any>{
    return this.http.get<any>(this.profileAPI + username)
  }
  updateProfile(user: any):Observable<any>{
    return this.http.put(`${environment.apiUrl}public/user/update`,user);
  }
  viewImage(name:string):Observable<any>{
    return this.http.get(`${environment.apiUrl}public/image/`+name);
  }
}
