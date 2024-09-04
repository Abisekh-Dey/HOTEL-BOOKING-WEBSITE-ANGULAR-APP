import { Component } from '@angular/core';
import { UserLogin } from '../../common/user_login';
import { UserSigninService } from '../../services/user-signin.service';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-loginuser',
  templateUrl: './loginuser.component.html',
  styleUrl: './loginuser.component.css'
})
export class LoginuserComponent {
  user: UserLogin = {
    email:"",
    password:"",
    rememberMe:false,
  };
  submitted:boolean = false;
  errorstatus:number= 0;
  contact=false;
  // invalidUser:boolean = false;
  constructor(private user_signinService: UserSigninService,private authService: AuthService,) { }

  loginUser(): void {
    const data = {
      email: this.user.email,
      password: this.user.password,
      rememberMe: this.user.rememberMe
    };

    this.user_signinService.login(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          if(this.errorstatus!==0){
            this.errorstatus=0;
          }
          const userName = res.name; // Use email if name is not provided
          const userId = res.id;
          const contact_no = res.contact_no;
          const useremail = res.email;
          this.authService.login(userName,userId,contact_no,useremail);
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

  backuploginUser(): void {
    const data = {
      email: this.user.email,
      contact_no: this.user.contact_no,
      rememberMe: this.user.rememberMe
    };

    this.user_signinService.backuplogin(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          if(this.errorstatus!==0){
            this.errorstatus=0;
          }

          const userName = res.name; // Use email if name is not provided
          const uid = res.id;
          const email = res.email;
          const contact = res.contact_no;
          this.authService.login(userName,uid,email,contact);
          // if(this.invalidadmin!==false){
          //   this.invalidadmin = false;
          // }
        },
        error: (e) => {
          console.error(e);
          this.errorstatus=e.status;
          console.log(this.errorstatus);
          // this.invalidadmin=true;
        }
      });
  }
  forget():void{
    this.errorstatus=0;
    this.contact=true;
  }
  reset():void{
    this.errorstatus=0;
    this.contact=false;
  }

  newUser(): void {
    this.submitted = false;
    this.user = {
      email:"",
      password:"",
      rememberMe:false
    };
  }
}
