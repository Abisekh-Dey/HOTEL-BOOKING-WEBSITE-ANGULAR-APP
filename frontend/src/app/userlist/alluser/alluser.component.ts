import { Component } from '@angular/core';
import { UserSignup } from '../../common/user_signup';
import { UserSignupService } from '../../services/user-signup.service';


@Component({
  selector: 'app-alluser',
  templateUrl: './alluser.component.html',
  styleUrl: './alluser.component.css'
})
export class AlluserComponent {
  users:UserSignup[]=[];
  errorstatus=0;

  constructor(private UserSignupService:UserSignupService) { }
  
  ngOnInit() {
    this.listusers();
  }

  listusers() {
    this.UserSignupService.getUserList().subscribe(
      data => {
        this.users = data;
        console.log(this.users)
      }
    )
  }
}
