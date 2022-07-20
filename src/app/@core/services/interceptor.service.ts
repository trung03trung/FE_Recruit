import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';

//Interceptor có thể hữu ích để thêm tiêu đề tùy chỉnh vào yêu cầu gửi đi, ghi lại phản hồi đến
@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(public http: TokenService,private router: Router) {}
  // Mục tiêu là JWT gửi đến local storage Authorization header in any HTTP request
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  if(localStorage.getItem('user')!=null){
    const userinfo = JSON.parse(localStorage.getItem('user'));
    const role = userinfo.auth;
    const requestUser = request.clone({
        headers: request.headers.set('Authorization', role),
     });
     return next.handle(requestUser).pipe(
        map((event: HttpEvent<any>) =>{
          if(event instanceof HttpResponse){
            //console.log('event', event);
          }
          return event;
        }),
     catchError((error: HttpErrorResponse) => {
        if(error['status']===403){
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          this.http.removeToken;
          this.router.navigate(['/auth']);
        }
        return throwError(error);
     }),
     );
  }
  return next.handle(request);
  }
}
