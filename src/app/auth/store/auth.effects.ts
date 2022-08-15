import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

import * as AuthActions from './auth.actions';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
 


@Injectable()
export class AuthEffects {
   
    authLogin$ = createEffect(() => {       

        this.actions.pipe(
                ofType(AuthActions.LOGIN_START),
                switchMap( (authData: AuthActions.LoginStart):any => {
                     this.authService.logIn( authData.payload.email, authData.payload.password)  
                        .pipe(
                            map(resData => {
                                const expirationDate = new Date(
                                    new Date().getTime() +  +resData.expiresIn * 1000
                                )
                                return new AuthActions.Login({
                                    email: resData.email,
                                    userId: resData.localId,
                                    token: resData.idToken,
                                    expirationDate: expirationDate
                                })
                            }),
                            catchError((errorRes) => {
                                let errorMessage = 'An error ocurred';
                                if(!errorRes.error || !errorRes.error.error){
                                    return of(new AuthActions.LoginFail(errorMessage))
                                }
                                return of(new AuthActions.LoginFail(errorMessage))
                        })
                    );
                    
                }
            )
        ) 
        return of(new AuthActions.LoginFail('An error ocurred'))
    });
    

    


    constructor(private actions: Actions, 
                private authService: AuthService){}



                
}



 

 
  
  