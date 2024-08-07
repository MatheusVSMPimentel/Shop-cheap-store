import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { LocalStorageUtils } from "../../utils/localstorage";

export abstract class BaseGuard{
  private localStorage = new LocalStorageUtils();

  constructor(protected router: Router) { }

  validClaims(routeAc: ActivatedRouteSnapshot): boolean {
    if (!this.localStorage.HasUserLoggedIn()) {
      this.router.navigate(['/account/login'],{queryParams: { returnUrl: this.router.url}});
      return false;
    }

    let user = this.localStorage.getUser();
    let claimData: any = routeAc.data[0]

    if (claimData !== undefined) {
      let claim = routeAc.data[0]['claim']

      if (claim) {

        if (!user.claims) {
          this.unauthorizedAccess();
          return false
        }

        let userClaims = user.claims.find((x: any) => x.type === claim.name);

        if (!userClaims) {
          this.unauthorizedAccess();
          return false
        }

        let claimValues = userClaims.value as string;

        if(!claimValues.includes(claim.value)){
          this.unauthorizedAccess();
        }
      }
    }
    return true;
  }

  private unauthorizedAccess() {
    this.router.navigate(['/unauthorized'])
  }
}