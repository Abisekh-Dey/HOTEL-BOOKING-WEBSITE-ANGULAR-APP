import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AddHotelComponentComponent } from './components1/add-hotel-component/add-hotel-component.component';
import { HotelDetailsComponentComponent } from './components1/hotel-details-component/hotel-details-component.component';
import { HotelListComponent } from './components1/hotel-list/hotel-list.component';
import { RoomListComponent } from './components2/room-list/room-list.component';
import { AddUserComponent } from './user_signup/add-user/add-user.component';
import { AdminSingupComponent } from './components3/admin-singup/admin-singup.component';
import { HomeComponent } from './home/home.component';
import { LoginuserComponent } from './user_login/loginuser/loginuser.component';
import { VerifyPasswordComponent } from './password_auth/verify-password/verify-password.component';
import { LoginadminComponent } from './admin_login/loginadmin/loginadmin.component';
import { AdminhomeComponent } from './admin_home/adminhome/adminhome.component';
import { AddRoomComponentComponent } from './components2/add-room-component/add-room-component.component';
import { AdminlistComponent } from './all_admin/adminlist/adminlist.component';
import { AdminupdateComponent } from './admin_update/adminupdate/adminupdate.component';
import { UpdatePasswordComponent } from './password_update/update-password/update-password.component';
import { RoomInfoComponent } from './roominfo/room-info/room-info.component';
import { WishlistComponent } from './wish/wishlist/wishlist.component';
import { AlluserComponent } from './userlist/alluser/alluser.component';
import { AllbookingComponent } from './bookinglist/allbooking/allbooking.component';
import { AllbookingbyuserComponent } from './bookingbyuser/allbookingbyuser/allbookingbyuser.component';
import { UserupdateComponent } from './user_update/userupdate/userupdate.component';
import { BookingfinalComponent } from './booking_confirmation/bookingfinal/bookingfinal.component';
import { UserfeedbackComponent } from './user_feedback/userfeedback/userfeedback.component'
// import { AddAdminComponent } from "./components3/admin-crud/admin-crud.component"
// import { AdminComponent } from './admin/admin.component';
// import { AdminCrudComponent } from './components3/admin-crud/admin-crud.component';

@NgModule({
  declarations: [
    AppComponent,
    AddHotelComponentComponent,
    HotelDetailsComponentComponent,
    HotelListComponent,
    RoomListComponent,
    AddUserComponent,
    AdminSingupComponent,
    HomeComponent,
    LoginuserComponent,
    VerifyPasswordComponent,
    LoginadminComponent,
    AdminhomeComponent,
    AddRoomComponentComponent,
    AdminlistComponent,
    AdminupdateComponent,
    UpdatePasswordComponent,
    RoomInfoComponent,
    WishlistComponent,
    AlluserComponent,
    AllbookingComponent,
    AllbookingbyuserComponent,
    UserupdateComponent,
    BookingfinalComponent,
    UserfeedbackComponent
    // AddAdminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
