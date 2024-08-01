export class LocalStorageUtils{

  public getUser(){
    let user: string | null =  localStorage.getItem('shopCheap.user')
    return user === null ? null :  JSON.parse(user) ;
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
    return localStorage.getItem('shopCheap.user')
  }

  private setLocalUserToken(token: string){
    localStorage.setItem('shopCheap.token', token);
  }

  private setUserOnLocalData(user: string){
    localStorage.setItem('shopCheap.user', JSON.stringify(user));
  }
}