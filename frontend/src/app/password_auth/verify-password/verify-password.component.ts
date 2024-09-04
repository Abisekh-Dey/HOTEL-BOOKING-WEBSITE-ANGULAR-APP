import { Component } from '@angular/core';
import { Authentication } from '../../common/password';
import { PasswordAuthenticationService } from '../../services/password-authentication.service';
@Component({
  selector: 'app-verify-password',
  templateUrl: './verify-password.component.html',
  styleUrl: './verify-password.component.css'
})
export class VerifyPasswordComponent {
  user: Authentication = {
    password:"",
  };
  submitted:boolean = false;
  errorstatus:number= 0;
  // invalidUser:boolean = false;
  constructor(private passwordService: PasswordAuthenticationService) { }

  authenticate(): void {
    const data = {
      password: this.user.password,
    };

    this.passwordService.authentication(data)
      .subscribe({
        next: (res) => {
          // console.log(res);
          this.submitted = true;
          if(this.errorstatus!==0){
            this.errorstatus=0;
          }
          // if(this.invalidUser!==false){
          //   this.invalidUser = false;
          // }
        },
        error: (e) => {
          console.error(e);
          this.errorstatus=e.status;
          console.log(this.errorstatus);
          // this.invalidUser=true;
        }
      });
  }

  newUser(): void {
    this.submitted = false;
    this.user = {
      password:"",
    };
  }
}
