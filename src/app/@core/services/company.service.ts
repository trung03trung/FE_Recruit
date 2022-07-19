import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Company } from "../models/company";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
   Authorization:'Bearer '+localStorage.getItem('auth-token'),
  }),
};
@Injectable({
  providedIn: "root",
})
export class CompanyService {
  UrlCompany: string;
  UrlUpdateCompany : string;

  constructor(private http: HttpClient) {
    this.UrlCompany = "http://localhost:9090/api/public/company/";
    this.UrlUpdateCompany = "http://localhost:9090/api/public/update-company";
  }

  getCompanyById(company: any): Observable<any> {
    return this.http.get<any>(this.UrlCompany+company);
  }

  updateCompany(company: any): Observable<any> {
    return this.http.put<any>(this.UrlUpdateCompany, company);
  }
}
