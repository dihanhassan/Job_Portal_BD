import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../config/environment';
import { AuthService } from './Auth.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector,private router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const localData = localStorage.getItem(environment.USER_VALIDITY);
    let userValidity: any;

    if (localData != null) {
      userValidity = JSON.parse(localData);
    }
    console.log(userValidity?.accessToken);

    const cloneRequest = this.addTokenHeader(req, userValidity?.accessToken);
    console.log(userValidity);

    return next.handle(cloneRequest).pipe(
      catchError((errordata: HttpErrorResponse) => {
        console.log(errordata);
        if (errordata.status === 0) {
          console.log("Error 0");
        
          // Ensure that handleRefreshToken is called properly
          return this.handleRefreshToken(req, next);
        }
        return throwError(errordata);
      })
    );
  }

  handleRefreshToken(req: HttpRequest<any>, next: HttpHandler) {
    let authService = this.injector.get(AuthService);
    const localData = localStorage.getItem(environment.USER_VALIDITY);
    let userValidity: any;
    userValidity = JSON.parse(localData || '{}'); // Added default empty object to prevent errors
    console.log(userValidity);
    if(userValidity.refreshToken === null || userValidity.refreshToken === undefined){
      
      authService.userLogout();
      
    }
    return authService.getAccessToken(userValidity).pipe(
      switchMap((data: any) => {
        userValidity.accessToken = data?.acessToken;
        userValidity.refreshToken = data?.refreshToken;
   
        console.log(userValidity);
        localStorage.setItem(environment.USER_VALIDITY, JSON.stringify(userValidity));
        return next.handle(this.addTokenHeader(req, userValidity?.accessToken));
      }),
      catchError(error => {
        console.log("Error in Refresh Token");
        this.router.navigate(['/login']);
        authService.userLogout();
        return throwError(error);
      })
    );
  }

  addTokenHeader(req: HttpRequest<any>, token: any) {
    console.log("Request ");
    return req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
  }
}
