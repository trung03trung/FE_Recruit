import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
   Authorization:'Bearer '+localStorage.getItem('auth-token'),
  }),
};

const httpOptionsFile = new HttpHeaders({
  'Content-Type': 'application/json',
 Authorization:'Bearer '+localStorage.getItem('auth-token'),
});

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

  public getDataLineChart(data): Observable<any> {
    return this.http.post(`${this.baseUrl}/line-chart`,data,httpOptions);
  }

  public getDataColumnChart(data): Observable<any> {
    return this.http.post(`${this.baseUrl}/column-chart`,data,httpOptions);
  }

  public exportData(date):Observable<any>{
    return this.http.post(`${this.baseUrl}/job/export-dashboard`,date,{headers:httpOptionsFile,observe: 'response' ,responseType: 'blob'});
  }
}
