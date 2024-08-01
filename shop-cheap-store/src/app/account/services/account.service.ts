
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { catchError, map, Observable } from 'rxjs';
import { BaseService } from '../../services/base.service';

@Injectable()
export class AccountService extends BaseService {
  constructor(private http: HttpClient){
    super();
  }

  userRegister(user: User): Observable<User>{
    let response = this.http.post(this.urlServiceV1+'nova-conta',user, this.getJSONHeader())
    .pipe(
      map(this.extractData),
      catchError(this.serviceError)
    );

    return response;
  }

  login(user: User){
    let response = this.http.post(this.urlServiceV1+'entrar',user, this.getJSONHeader())
    .pipe(
      map(this.extractData),
      catchError(this.serviceError)
    );

    return response;
  }
}