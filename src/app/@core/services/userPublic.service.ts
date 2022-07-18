import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Users } from "../models/user";
import { environment } from '../../../environments/environment';
import { SeachUser } from "../models/seachUser";


@Injectable({
  providedIn: "root",
})
export class UserPublicService {
  updateUserUrl: string;
  changthepass: string;
  private readonly baseUrl = `${environment.apiUrl}auth/`;
  
  constructor(private http: HttpClient) {
    this.updateUserUrl="http://localhost:9090/api/public/updateUser";
    this.changthepass ="http://localhost:9090/api/public/changeThePassWord";
  }

  updateUser(user: Users): Observable<Users> {
    return this.http.put<Users>(this.updateUserUrl, user);
  }

  changeThePassword(form: any): Observable<any> {
    return this.http.put<any>(this.changthepass, form);
  }
}
