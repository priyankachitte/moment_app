import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UtilService } from './../services/util-service';
import { AuthService } from '../services/auth-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private utilService: UtilService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.auth.getAuthToken();
    const isExternalUrl = this.utilService.isExternalUrl(req.url);

    let authReq;
    if (authToken && !isExternalUrl) {
      authReq = req.clone({
        setHeaders: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
        }
      });
    } else {
      authReq = req;
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}
