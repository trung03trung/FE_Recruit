import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Users } from "../models/user";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("auth-token"),
  }),
};

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

  constructor(private http: HttpClient) {
    this.addUserURL = "http://localhost:8081/api/admin/addUserJe";
    this.getUserURL = "http://localhost:8081/api/admin/user";
    this.deactivateUserUrl = "http://localhost:8081/api/admin/deactivateUser";
    this.getUserJeURL = "http://localhost:8081/api/admin/userSeach";
    this.updateUserUrl = "http://localhost:8081/api/admin/updateUser";
    this.changthepass = "http://localhost:8081/api/admin/changeThePassWord";
  }

  getAllUser(): Observable<Users[]> {
    return this.http.get<Users[]>(this.getUserURL, httpOptions);
  }

  getAllUserJeForm(seachUser: any): Observable<any> {
    return this.http.post<any>(this.getUserJeURL, seachUser, httpOptions);
  }

  addUser(user: Users): Observable<any> {
    return this.http.post<any>(this.addUserURL, user, httpOptions);
  }

  updateUser(user: Users): Observable<Users> {
    return this.http.put<Users>(this.updateUserUrl, user, httpOptions);
  }

  changeThePassword(form: any): Observable<any> {
    return this.http.put<any>(this.changthepass, form, httpOptions);
  }

  deactivateUser(user: Users): Observable<any> {
    return this.http.put<any>(this.deactivateUserUrl, user, httpOptions);
  }
}
