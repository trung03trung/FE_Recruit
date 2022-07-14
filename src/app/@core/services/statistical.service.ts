import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class StatisticalService {
  Urlstatistical: string;

  constructor(private http: HttpClient) {
    this.Urlstatistical = "http://localhost:9090/api/admin/statistical";
  }

  getStatistical(stati: any): Observable<any> {
    return this.http.get<any>(this.Urlstatistical,stati);
  }
}
