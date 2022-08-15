import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, tap } from 'rxjs/operators'
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { User } from './user.model';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import { environment } from 'src/environments/environment';


export interface AuthResponse {
    'idToken': string;
    'email': string;
    'refreshToken': string;
    'expiresIn': string;
    'localId': string;
    'registered?': boolean;
  }

@Injectable({ providedIn: 'root'})
export class AuthService {

    constructor(private http: HttpClient, 
                private router: Router, 
                private store: Store<fromApp.AppState>){}

    private tokenExpirationTimer: any;

    public logIn(email: string, password: string){
      return this.http.post<AuthResponse>
      ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey,
      {
        email:email,
        password:password,
        returnSecureToken: true
      })
      .pipe(catchError(this.handleError),
        tap(res => {
          this.handleAuthenticaton(
            res.email,
            res.localId,
            res.idToken,
            +res.expiresIn
          )
        }))
  }

  public autoLogin(): any{
    const userData: {
      email: string;
      id:string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData')!);
    if(!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if(loadedUser.token) {
      // this.user.next(loadedUser);
      this.store.dispatch(
        new AuthActions.Login({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate)
        })
      )
    }

  }

  public logout(): void {
    this.store.dispatch(new AuthActions.Logout())
    // this.user.next(null as any);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      this.tokenExpirationTimer = null;
    }
  }

  private handleAuthenticaton(
    email:string,
    localId:string,
    idToken:string,
    expiresIn:number): void {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, localId, idToken, expirationDate);
    // this.user.next(user);
      this.store.dispatch(
        new AuthActions.Login({
          email: email,
          userId: localId,
          token: idToken,
          expirationDate: expirationDate
      })
    );
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse){
    return throwError(errorRes.error.error.message);
  }

}
