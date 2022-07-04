import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
  


@Injectable()
export class TokenInterceptor implements HttpInterceptor {  

  constructor(public http: TokenService) {}  
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {      
  request = request.clone({  
    setHeaders: {  
      // set token admin
      Authorization: `Token ${this.http.getToken()}`
    }  
  });    
  return next.handle(request);  
  }  
}  