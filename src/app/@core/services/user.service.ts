import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Users } from "../models/user";
import { environment } from '../../../environments/environment';
import { SeachUser } from "../models/seachUser";

@Injectable({
  providedIn: "root",
})
export class UserService {
  addUserURL: string;
  getUserURL: string;
  getUserJeURL: string;
  updateUserUrl: string;
  changthepass: string;
  deactivateUserUrl: string;
  saveNewPassW: string;
  private readonly baseUrl = `${environment.apiUrl}auth/`;
  
  constructor(private http: HttpClient) {
    this.addUserURL = "http://localhost:9090/api/public/addUserJe";
    this.getUserURL = "http://localhost:9090/api/public/user";
    this.deactivateUserUrl = "http://localhost:9090/api/public/deactivateUser";
    this.getUserJeURL ="http://localhost:9090/api/public/userSeach";
    this.updateUserUrl="http://localhost:9090/api/public/updateUser";
    this.changthepass ="http://localhost:9090/api/public/changeThePassWord";
    this.saveNewPassW ="";
  }

  getAllUser(): Observable<Users[]> {
    return this.http.get<Users[]>(this.getUserURL);
  }

  getAllUserJe(seachUser: any): Observable<any> {
    return this.http.post<any>(this.getUserJeURL, seachUser);
  }
  getAllUserJeForm(seachUser: any): Observable<any> {
    return this.http.post<any>(this.getUserJeURL, seachUser);
  }

  addUser(user: Users): Observable<any> {
    return this.http.post<any>(this.addUserURL, user);
  }

  updateUser(user: Users): Observable<Users> {
    return this.http.put<Users>(this.updateUserUrl, user);
  }

  saveNewPassWord(form: any): Observable<any> {
    return this.http.put<any>(this.saveNewPassW, form);
  }

  changeThePassword(form: any): Observable<any> {
    return this.http.put<any>(this.changthepass, form);
  }

  deactivateUser(user: Users): Observable<Users> {
    return this.http.put<Users>(this.deactivateUserUrl,user);
  }
}
