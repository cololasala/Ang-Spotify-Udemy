import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionGuard  {
  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkSessionToken();
  }

  checkSessionToken(): any {
    try {
      const hasToken = this.cookieService.check('token');  // chequea si tiene el token como cookie
      if (!hasToken) {
        this.router.navigate(['auth/login']);
      }
      return hasToken;
    } catch {
      this.router.navigate(['auth/login']);
    }
  }
}
