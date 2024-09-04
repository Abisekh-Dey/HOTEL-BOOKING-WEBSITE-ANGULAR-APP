import { Component } from '@angular/core';
import { UserSignup } from '../../common/user_signup';
import { UserSignupService } from '../../services/user-signup.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  user: UserSignup = {
    name: '',
    email:"",
    contact_no:"",
    password:"",
    confirmPassword: ''
  };
  submitted:boolean = false;
  errorstatus:number= 0;
  // emptyFields:boolean=false;
  // userExist:boolean=false;

  passwordsMatch(): any {
    // If either field is empty, return null (or undefined) to indicate no state
    if (!this.user.password && !this.user.confirmPassword) {
      return null; // or you could use `undefined`
    }
    // Return true if passwords match, otherwise false
    return this.user.password && this.user.confirmPassword && this.user.password === this.user.confirmPassword;
  }
  
  
  
  constructor(private user_signupService: UserSignupService) { }

  saveUser(): void {
    const data = {
      name: this.user.name,
      email: this.user.email,
      contact_no: this.user.contact_no,
      password: this.user.password
    };

    this.user_signupService.create(data)
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
          // else if(this.userExist!==false){
          //   this.userExist=false;
          // }
        },
        error: (e) => {
          console.error(e);
          this.errorstatus=e.status;
          console.log(this.errorstatus);
          // if(this.errorstatus===422){
          //   this.emptyFields=true;
          //   if(this.userExist!==false){
          //     this.userExist=false;
          //   }
          // }
          // else if(this.errorstatus===420){
          //   this.userExist=true;
          //   if(this.emptyFields!==false){
          //     this.emptyFields=false;
          //   }
          // }
        }
      });
  }
  newUser(): void {
    this.submitted = false;
    this.user = {
      name: '',
      email:"",
      contact_no:"",
      password:"",
      confirmPassword: ''
    };
  }
}
