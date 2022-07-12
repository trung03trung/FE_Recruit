import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Users } from "../models/user";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class UserService {
  addUserURL: string;
  getUserURL: string;
  getUserJeURL: string;
  updateUserUrl: string;
  deactivateUserUrl: string;
  private readonly baseUrl = `${environment.apiUrl}auth/`;
  
  constructor(private http: HttpClient) {
    this.addUserURL = "http://localhost:9090/api/auth/signup";
    this.getUserURL = "http://localhost:9090/api/public/user";
    this.deactivateUserUrl = "http://localhost:9090/api/public/user/{id}?id=";
    this.getUserJeURL ="http://localhost:9090/api/public/userje";
    this.updateUserUrl="http://localhost:9090/api/public/updateUser";
  }

  getAllUser(): Observable<Users[]> {
    return this.http.get<Users[]>(this.getUserURL);
  }

  getAllUserJe(): Observable<Users[]> {
    return this.http.get<Users[]>(this.getUserJeURL);
  }

  addUser(user: Users): Observable<Users> {
    return this.http.post<Users>(this.addUserURL, user);
  }

  updateUser(user: Users): Observable<Users> {
    return this.http.put<Users>(this.updateUserUrl, user);
  }

  deactivateUser(id: number): Observable<Users> {
    return this.http.get<Users>(this.deactivateUserUrl + id);
  }
}
