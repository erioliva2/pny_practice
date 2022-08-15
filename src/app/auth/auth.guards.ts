import { CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router, } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';


@Injectable({ providedIn: 'root'})
export class AuthGards implements CanActivate {

  constructor( private authService: AuthService, 
               private router: Router, 
               private store: Store<fromApp.AppState>){}


    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):
    | Promise<boolean>
    | Observable<boolean>
    | boolean
    {
      // return this.authService.user.pipe(
        return this.store.select('auth').pipe(
        take(1),
        map(authState => {
          return authState.user
        }),
        map(user => {
        return !!user;
      }),
      tap(isAuth => {
        if(!isAuth){
          this.router.navigate(['/auth'])
        }
      })
    );
  }

}
