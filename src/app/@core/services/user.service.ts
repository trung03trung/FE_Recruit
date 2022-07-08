import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable } from "rxjs";
import { Users } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  addUserURL: string;
  getUserURL: string;
  updateUserUrl: string;
  deactivateUserUrl: string;

  constructor(private http: HttpClient) {
    this.addUserURL = "http://localhost:9090/api/public/user";
    this.getUserURL = "http://localhost:9090/api/public/user";
    this.deactivateUserUrl = "http://localhost:9090/api/public/user/{id}?id=";
  }

  getAllUser(): Observable<Users[]> {
    return this.http.get<Users[]>(this.getUserURL);
  }
  
  addUser(user: Users): Observable<Users> {
    return this.http.post<Users>(this.addUserURL, user);
  }

  updateEmployee(user: Users): Observable<Users> {
    return this.http.put<Users>(this.updateUserUrl, user);
  }

  deactivateUser(id: number): Observable<Users> {
    return this.http.get<Users>(this.deactivateUserUrl + id);
  }
}
