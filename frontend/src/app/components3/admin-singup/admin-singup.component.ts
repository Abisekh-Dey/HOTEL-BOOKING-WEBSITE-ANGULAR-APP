import { Component } from '@angular/core';
import { AdminSignup } from '../../common/admin_signup';
import { AdminSignupService } from '../../services/admin-signup.service';

@Component({
  selector: 'app-admin-singup',
  templateUrl: './admin-singup.component.html',
  styleUrl: './admin-singup.component.css'
})
export class AdminSingupComponent {
  admin: AdminSignup = {
    name: '',
    email:"",
    contact_no:"",
    password:"",
    confirmPassword: '',
    authentication_password:"",
  };
  submitted:boolean = false;
  errorstatus:number= 0;
  // emptyFields:boolean=false;
  // adminExist:boolean=false;

  passwordsMatch(): any {
    // If either field is empty, return null (or undefined) to indicate no state
    if (!this.admin.password && !this.admin.confirmPassword) {
      return null; // or you could use `undefined`
    }
    // Return true if passwords match, otherwise false
    return this.admin.password && this.admin.confirmPassword && this.admin.password === this.admin.confirmPassword;
  }
  
  
  
  constructor(private admin_signupService: AdminSignupService) { }

  saveAdmin(): void {
    const data = {
      name: this.admin.name,
      email: this.admin.email,
      contact_no: this.admin.contact_no,
      password: this.admin.password,
      authentication_password: this.admin.authentication_password,
    };

    this.admin_signupService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          if(this.errorstatus!==0){
            this.errorstatus=0;
          }
          // if(this.emptyFields!==false){
          //   this.emptyFields=false;
          // }
          // else if(this.adminExist!==false){
          //   this.adminExist=false;
          // }
        },
        error: (e) => {
          console.error(e);
          this.errorstatus=e.status;
          console.log(this.errorstatus);
          // if(this.errorstatus===422){
          //   this.emptyFields=true;
          //   if(this.adminExist!==false){
          //     this.adminExist=false;
          //   }
          // }
          // else if(this.errorstatus===420){
          //   this.adminExist=true;
          //   if(this.emptyFields!==false){
          //     this.emptyFields=false;
          //   }
          // }
        }
      });
  }
  newadmin(): void {
    this.submitted = false;
    this.admin = {
      name: '',
      email:"",
      contact_no:"",
      password:"",
      confirmPassword: '',
      authentication_password:""
    };
  }
}