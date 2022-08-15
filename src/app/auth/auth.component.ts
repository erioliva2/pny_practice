import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponse } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router){}

      error = null;
      @ViewChild('authForm') authForm!: NgForm;

      ngOnInit(): void {}

      public onSubmit(form: NgForm): void {
          if(!form.valid){
            return;
          }
          const email = form.value.userData.email;
          const password = form.value.userData.password;
          let authObj: Observable<AuthResponse>

          authObj = this.authService.logIn(email, password);
          authObj.subscribe(res => {
            this.router.navigate(['./'])
          },
          err => {
            console.log('res error ----------->', err);
            this.error = err;
          }
        )
    }

  }
