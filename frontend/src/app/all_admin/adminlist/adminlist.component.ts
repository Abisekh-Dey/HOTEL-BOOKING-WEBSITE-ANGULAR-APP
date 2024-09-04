import { Component } from '@angular/core';
import { AdminSignup } from '../../common/admin_signup';
import { AdminlistService } from '../../services/adminlist.service';
import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-adminlist',
  templateUrl: './adminlist.component.html',
  styleUrl: './adminlist.component.css'
})
export class AdminlistComponent {
  admins:AdminSignup[]=[];
  deleteid:string="";
  aid:string | null = '';
  errorstatus=0;
  mainAdmin=false;

  constructor(private adminlistService: AdminlistService,private adminAuthService: AdminAuthService) { }
  
  ngOnInit() {
    this.listadmins();
    this.aid=this.adminAuthService.getAdminId();
  }

  listadmins() {
    this.adminlistService.getAdminList().subscribe(
      data => {
        this.admins = data;
        console.log(this.admins)
      }
    )
  }

  removeClick(did:any):void{
    this.deleteid=did;
    console.log(this.aid);
  }
  reset():void{
    this.deleteid="";
    this.aid = '';
    this.errorstatus=0;
    this.ngOnInit();
  }
  deleteAdmin():void{
    this.adminlistService.delete(this.aid,this.deleteid).subscribe({
      next: (res) => {
        console.log('Admin Removed Successfully', res);
        // this.submitted = true;
        if(this.aid===this.deleteid){
          this.mainAdmin=true;
          this.adminAuthService.logout();
        }
      },
      error: (e) => {
        console.error('Error deleting admin', e);
        this.errorstatus = e.status;
      }
    })
  }
}