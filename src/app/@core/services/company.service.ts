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

const httpOptionsFD = {
  headers: new HttpHeaders({
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
    this.UrlCompany = "http://localhost:8081/api/admin/company/";
    this.UrlUpdateCompany = "http://localhost:8081/api/admin/update-company";
  }

  getCompanyById(companyId: number): Observable<Company> {
    return this.http.get<Company>(this.UrlCompany+companyId,httpOptions);
  }

  createCompany(company: any): Observable<any> {
    return this.http.post<any>(this.UrlCompany, company,httpOptionsFD);
  }
}
