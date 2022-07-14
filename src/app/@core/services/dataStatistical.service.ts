import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataService {
  dataS: string;
  constructor(private http: HttpClient) {
    this.dataS = "";
  }
  getDataS(form:any): Observable<any> {
    return this.http.post<any>(this.dataS,form);
  }
}
