import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilePublickService {

  profilePulicUrl : string;

  constructor(private http: HttpClient) { 
    this.profilePulicUrl = "http://localhost:9090/api/public/user/{userName}?userName=";
  }
  
  getProfile(username: any):Observable<any>{
    return this.http.get<any>(this.profilePulicUrl + username)
  }
}
