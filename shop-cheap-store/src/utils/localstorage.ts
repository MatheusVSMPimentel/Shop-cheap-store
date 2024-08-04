import { StringUtils } from "./string-util";

export class LocalStorageUtils{

  public getUser(){
    let user: string | null =  localStorage.getItem('shopCheap.user');
    if(!user || StringUtils.isNullOrEmpty(user)) {
      this.cleanLocalData();
      return '';
    }
    return  JSON.parse(user) ;
  }

  public setLocalUserData(response: any){
    this.setLocalUserToken(response.accessToken);
    this.setUserOnLocalData(response.userToken);
  }

  public cleanLocalData(): void{
    localStorage.removeItem('shopCheap.token');
    localStorage.removeItem('shopCheap.user');
  }

  public getLocalUserToken(): string | null{
    return localStorage.getItem('shopCheap.token')
  }

  private setLocalUserToken(token: string){
    localStorage.setItem('shopCheap.token', token);
  }

  private setUserOnLocalData(user: string){
    localStorage.setItem('shopCheap.user', JSON.stringify(user));
  }

  public HasUserLoggedIn(): boolean{
    if(StringUtils.isNullOrEmpty(localStorage.getItem('shopCheap.user'))) {
      this.cleanLocalData();
      return false;
    }
    if(StringUtils.isNullOrEmpty(localStorage.getItem('shopCheap.user'))) {
      this.cleanLocalData();
      return false;
    }
    return true
  }
}