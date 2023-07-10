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
export class TokenInterceptor {

  constructor(public http: TokenService,private router: Router) {}
  // Mục tiêu là JWT gửi đến local storage Authorization header in any HTTP request
}
