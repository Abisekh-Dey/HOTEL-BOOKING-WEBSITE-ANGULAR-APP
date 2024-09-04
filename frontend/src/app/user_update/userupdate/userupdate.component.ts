import { Component } from '@angular/core';
import { UserSignup } from '../../common/user_signup';
import { UserSignupService } from '../../services/user-signup.service';
import { AuthService } from '../../services/auth-service.service';


@Component({
  selector: 'app-userupdate',
  templateUrl: './userupdate.component.html',
  styleUrl: './userupdate.component.css'
})
export class UserupdateComponent {
  user: UserSignup = {
    name: '',
    email:"",
    contact_no:"",
    password:"",
    confirmPassword: '',
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
    if (!this.user.password && !this.user.confirmPassword) {
      return null; // or you could use `undefined`
    }
    // Return true if passwords match, otherwise false
    return this.user.password && this.user.confirmPassword && this.user.password === this.user.confirmPassword;
  }
  constructor(private UserSignupService: UserSignupService,private authService:AuthService) { }

  updateClick():void{
    this.user.name = this.authService.getAdminName() ?? '';
    this.user.email = this.authService.getUserEmail() ?? '';
    this.user.contact_no = this.authService.getAdminContact() ?? '';
  }
  updateUser():void{
    const data = {
      name: this.user.name,
      email: this.user.email,
      contact_no: this.user.contact_no,
      password: this.user.password ,
    };
  
    this.UserSignupService.update(this.authService.getUserId(), data).subscribe({
      next: (res) => {
        console.log('User updated successfully', res);
        this.submitted = true;
      },
      error: (e) => {
        console.error('Error updating user', e);
        this.errorstatus = e.status;
      }
    });
  }
}
