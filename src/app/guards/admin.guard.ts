import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanLoad {
  constructor(private auth: AuthService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.auth.getUser().pipe(
      map((user) => {
        if (
          !!user.authorities.find((a) => a.authority === 'ADMIN')?.authority
        ) {
          return true;
        } else {
          this.router.navigateByUrl('/contractor');
          return false;
        }
      })
    );
  }
}
