import { Component } from '@angular/core';
import { Authentication } from '../../common/password';
import { PasswordAuthenticationService } from '../../services/password-authentication.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent {
  user: Authentication = {
    password:"",
    re_password:""
  };
  submitted:boolean = false;
  errorstatus:number= 0;
  id:string="";
  // invalidUser:boolean = false;
  passwordsMatch(): any {
    // If either field is empty, return null (or undefined) to indicate no state
    if (!this.user.password && !this.user.re_password) {
      return null; // or you could use `undefined`
    }
    // Return true if passwords match, otherwise false
    return this.user.password && this.user.re_password && this.user.password === this.user.re_password;
  }
  
  constructor(private passwordService: PasswordAuthenticationService) { }

  authenticate(): void {
    const data = {
      password: this.user.password,
    };

    this.passwordService.authentication(data)
      .subscribe({
        next: (res) => {
          // console.log(res.id);
          this.submitted = true;
          this.id=res.id;
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
  updatePassword():void{
    const data = {
      password: this.user.password
    };
    
    this.passwordService.update(this.id, data).subscribe({
      next: (res) => {
        console.log('Password updated successfully', res);
      },
      error: (e) => {
        console.error('Error updating paassword', e);
        this.errorstatus = e.status;
      }
    });
  }
  reset():void{
    this.submitted=false;
    this.errorstatus=0;
    this.id="";
    this.user.password="";
  }

  newUser(): void {
    this.submitted = false;
    this.user = {
      password:"",
    };
  }
}
