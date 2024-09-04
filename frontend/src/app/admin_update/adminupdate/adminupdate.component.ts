import { Component } from '@angular/core';
import { AdminSignup } from '../../common/admin_signup';
import { AdminlistService } from '../../services/adminlist.service';
import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-adminupdate',
  templateUrl: './adminupdate.component.html',
  styleUrl: './adminupdate.component.css'
})
export class AdminupdateComponent {
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
  ngOnInit() {
    this.updateClick();
  }

  passwordsMatch(): any {
    // If either field is empty, return null (or undefined) to indicate no state
    if (!this.admin.password && !this.admin.confirmPassword) {
      return null; // or you could use `undefined`
    }
    // Return true if passwords match, otherwise false
    return this.admin.password && this.admin.confirmPassword && this.admin.password === this.admin.confirmPassword;
  }
  constructor(private adminlistService: AdminlistService,private adminAuthService:AdminAuthService) { }

  updateClick():void{
    this.admin.name = this.adminAuthService.getAdminName() ?? '';
    this.admin.email = this.adminAuthService.getAdminEmail() ?? '';
    this.admin.contact_no = this.adminAuthService.getAdminContact() ?? '';
  }
  updateAdmin():void{
    const data = {
      name: this.admin.name,
      email: this.admin.email,
      contact_no: this.admin.contact_no,
      password: this.admin.password ,
      authentication_password: this.admin.authentication_password
    };
  
    this.adminlistService.update(this.adminAuthService.getAdminId(), data).subscribe({
      next: (res) => {
        console.log('Admin updated successfully', res);
        this.submitted = true;
      },
      error: (e) => {
        console.error('Error updating admin', e);
        this.errorstatus = e.status;
      }
    });
  }
}
