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

  constructor(private http: HttpClient) {
    this.Urlstatistical = "http://localhost:9090/api/admin/statistical";
  }

  getStatistical(stati: any): Observable<any> {
    return this.http.post<any>(this.Urlstatistical,stati,httpOptions);
  }
}
