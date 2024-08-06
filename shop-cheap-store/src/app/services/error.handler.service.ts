import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { LocalStorageUtils } from "../../utils/localstorage";
import { Router } from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor
{
  public localStorage = new LocalStorageUtils();

  constructor(private route: Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return next.handle(req).pipe(
      catchError((error)=>{
        if(error instanceof HttpErrorResponse){
          if(error.status ===401){
            this.localStorage.cleanLocalData();
            this.route.navigate(['account/login'],{queryParams: { returnUrl: this.route.url}})
          }
          if(error.status ===403){
            this.route.navigate(['unauthorized'])
          }

        }
        return throwError(()=>error)
      })
    );
  }
}