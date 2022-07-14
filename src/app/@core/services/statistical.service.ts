import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class StatisticalService {
  Urlstatistical: string;

  constructor(private http: HttpClient) {
    this.Urlstatistical = "http://localhost:9090/api/public/statistical";
  }

  getStatistical(stati: any): Observable<any> {
    return this.http.post<any>(this.Urlstatistical,stati);
  }
}
