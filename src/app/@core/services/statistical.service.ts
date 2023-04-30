import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
   Authorization:'Bearer '+localStorage.getItem('auth-token'),
  }),
};
@Injectable({
  providedIn: "root",
})
export class StatisticalService {
  Urlstatistical: string;
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.Urlstatistical = "http://localhost:9090/api/admin/statistical";
    this.baseUrl = "http://localhost:9090/api/admin";
  }

  getStatistical(stati: any): Observable<any> {
    return this.http.post<any>(this.Urlstatistical,stati,httpOptions);
  }

  public getDataLineChart(): Observable<any> {
    return this.http.get(`${this.baseUrl}/line-chart`,httpOptions);
  }

  public getDataColumnChart(): Observable<any> {
    return this.http.get(`${this.baseUrl}/column-chart`,httpOptions);
  }
}
