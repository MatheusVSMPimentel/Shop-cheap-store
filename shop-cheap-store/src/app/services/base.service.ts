import { HttpErrorResponse, HttpHeaders } from "@angular/common/http"
import { throwError } from "rxjs";
import { LocalStorageUtils } from "../../utils/localstorage";
import { environment } from "../../environments/environment";

export abstract class BaseService {
  public localStorage = new LocalStorageUtils();
  protected urlServiceV1: string = environment.apiUrlv1;

  protected getJSONHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  protected getAuthJSONHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.localStorage.getLocalUserToken()}`
      })
    };
  }

  protected extractData(response: any) {
    return response.data || {};
  }

  protected serviceError(response: Response | any) {
    let customError: string[] = [];
    if (response instanceof HttpErrorResponse) {
      if (response.statusText === "Unknown Error") {
        customError.push("Unknown server error.");
        response.error.errors = customError;
      }
    }
    console.error(response);
    return throwError(()=>response);
  }
}