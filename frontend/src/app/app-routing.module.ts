import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHotelComponentComponent } from "./components1/add-hotel-component/add-hotel-component.component"
import { HotelListComponent } from './components1/hotel-list/hotel-list.component';
import { WishlistComponent } from './wish/wishlist/wishlist.component';
import { AddRoomComponentComponent } from "./components2/add-room-component/add-room-component.component"
import { RoomInfoComponent } from './roominfo/room-info/room-info.component';
import { HomeComponent } from './home/home.component'
import { AddUserComponent } from './user_signup/add-user/add-user.component';
import { LoginuserComponent } from "./user_login/loginuser/loginuser.component";
import { VerifyPasswordComponent } from "./password_auth/verify-password/verify-password.component";
import { AdminSingupComponent} from "./components3/admin-singup/admin-singup.component";
import { LoginadminComponent } from "./admin_login/loginadmin/loginadmin.component";
import { AdminhomeComponent } from "./admin_home/adminhome/adminhome.component";
import { AdminlistComponent } from "./all_admin/adminlist/adminlist.component";
import { AdminupdateComponent } from "./admin_update/adminupdate/adminupdate.component";
import { UpdatePasswordComponent } from "./password_update/update-password/update-password.component";
import { AlluserComponent } from "./userlist/alluser/alluser.component";
import { AllbookingComponent } from './bookinglist/allbooking/allbooking.component';
import { AllbookingbyuserComponent } from './bookingbyuser/allbookingbyuser/allbookingbyuser.component';
import { UserupdateComponent } from './user_update/userupdate/userupdate.component';
import { BookingfinalComponent } from './booking_confirmation/bookingfinal/bookingfinal.component';
import { UserfeedbackComponent } from '././user_feedback/userfeedback/userfeedback.component';

const routes: Routes = [
  // { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'bookings', component: AllbookingbyuserComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'updateProfile', component: UserupdateComponent },
  { path: 'allHotels', component: HotelListComponent },
  { path: 'allHotels/allRooms', component: RoomInfoComponent },
  { path: 'allHotels/allRooms/confirmBooking', component: BookingfinalComponent },
  { path: 'userSignup', component: AddUserComponent },
  { path: 'userSignin', component: LoginuserComponent },
  { path: 'authentication', component: VerifyPasswordComponent},
  { path: 'authentication/adminSignup', component: AdminSingupComponent},
  { path: 'authentication/adminSignin', component: LoginadminComponent},
  { path: 'authentication/adminSignup/adminHome', component: AdminhomeComponent},
  { path: 'authentication/adminSignin/adminHome', component: AdminhomeComponent},
  { path: 'authentication/adminSignin/adminHome/allHotels', component: HotelListComponent },
  { path: 'authentication/adminSignin/adminHome/hotels', component: AddHotelComponentComponent},
  { path: 'authentication/adminSignin/adminHome/rooms', component: AddRoomComponentComponent},
  { path: 'authentication/adminSignin/adminHome/admins', component: AdminlistComponent},
  { path: 'authentication/adminSignin/adminHome/users', component: AlluserComponent},
  { path: 'authentication/adminSignin/adminHome/bookings', component: AllbookingComponent},
  { path: 'authentication/adminSignin/adminHome/myprofile', component: AdminupdateComponent},
  { path: 'authentication/adminSignin/adminHome/passwordupdate', component: UpdatePasswordComponent},
  { path: 'authentication/adminSignin/adminHome/feedbacks', component: UserfeedbackComponent},
  // { path: 'Hotel/:id', component: ProductDetailsComponentComponent },
  // { path: 'add', component: AddHotelComponentComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  
}
