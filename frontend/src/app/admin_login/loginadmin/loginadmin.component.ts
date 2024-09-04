import { Component } from '@angular/core';
import { AdminLogin } from '../../common/admin_login';
import { AdminSigninService } from '../../services/admin-signin.service';
import { AdminAuthService } from '../../services/admin-auth.service';


@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrl: './loginadmin.component.css'
})
export class LoginadminComponent {
  admin: AdminLogin = {
    email:"",
    password:"",
    rememberMe:false,
  };
  submitted:boolean = false;
  errorstatus:number= 0;
  contact=false;
  // invalidadmin:boolean = false;
  constructor(private Admin_signinService: AdminSigninService,private AdminuthService: AdminAuthService,) { }

  loginAdmin(): void {
    const data = {
      email: this.admin.email,
      password: this.admin.password,
      rememberMe: this.admin.rememberMe
    };

    this.Admin_signinService.login(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          if(this.errorstatus!==0){
            this.errorstatus=0;
          }

          const adminName = res.name; // Use email if name is not provided
          const aid = res.id;
          const email = res.email;
          const contact = res.contact_no;
          // console.log(res)
          // console.log(res.id)
          this.AdminuthService.login(adminName,aid,email,contact);
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

  backuploginAdmin(): void {
    const data = {
      email: this.admin.email,
      contact_no: this.admin.contact_no,
      rememberMe: this.admin.rememberMe
    };

    this.Admin_signinService.backuplogin(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          if(this.errorstatus!==0){
            this.errorstatus=0;
          }

          const adminName = res.name; // Use email if name is not provided
          const aid = res.id;
          const email = res.email;
          const contact = res.contact_no;
          this.AdminuthService.login(adminName,aid,email,contact);
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
  newAdmin(): void {
    this.submitted = false;
    this.admin = {
      email:"",
      password:"",
      rememberMe:false
    };
  }
}
