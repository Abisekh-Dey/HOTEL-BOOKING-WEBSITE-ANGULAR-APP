import { Component } from '@angular/core';
import { BookingserviceService } from '../../services/bookingservice.service';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-allbookingbyuser',
  templateUrl: './allbookingbyuser.component.html',
  styleUrl: './allbookingbyuser.component.css'
})
export class AllbookingbyuserComponent {
  bookings:any[]=[];
  userId:string|null="";
  bookingId:string|null="";
  errorstatus=0;
  in:string|null="";
  out:string|null="";

  constructor(private BookingserviceService:BookingserviceService,private AuthService:AuthService) { }
  
  ngOnInit() {
    this.userId=this.AuthService.getUserId();
    this.listbookings();
  }

  listbookings() {
    this.BookingserviceService.getBookingListbyUser(this.userId).subscribe(
      data => {
        this.bookings = data.bookings;
        for(let i of this.bookings){
          i.checkInDate=new Date(i.checkInDate).toISOString().split('T')[0];
          i.checkOutDate=new Date(i.checkOutDate).toISOString().split('T')[0];
        }
        for(let i of this.bookings){
          if(i.room.type === 'normal'||i.room.type === 'normal (1 person)'||i.room.type === 'normal (2 person)'||i.room.type === 'normal (3 person)'||i.room.type === 'normal (4 person)'||i.room.type === 'Family normal (5 person)'||i.room.type === 'Family normal (6 person)'){
            i.room.price = String((Number(i.room.price)+768)-1);
          }
          if(i.room.type === 'delux'||i.room.type === 'delux (1 person)'||i.room.type === 'delux (2 person)'||i.room.type === 'delux (3 person)'||i.room.type === 'delux (4 person)'||i.room.type === 'Family delux (5 person)'||i.room.type === 'Family delux (6 person)'){
            i.room.price = String((Number(i.room.price)+1512)-1);
          }
          if(i.room.type === 'suite'||i.room.type === 'suite (2 person)'||i.room.type === 'suite (3 person)'||i.room.type === 'suite (4 person)'||i.room.type === 'Family suite (5 person)'||i.room.type === 'Family suite (6 person)'){
            i.room.price = String((Number(i.room.price)+1692)-1);
          }
          console.log(i.room.type)
        }
        console.log(this.bookings)
      }
    )
  }

  updateClick(bookingId:string,checkInDate: string, checkOutDate: string): void {
    this.in=checkInDate;
    this.out=checkOutDate;
    this.bookingId=bookingId;
  }
  deleteClick(bookingId:string):void{
    this.bookingId=bookingId;
  }

  updateBooking():void{
    const data = {
      in: this.in,
      out: this.out
    };
    console.log(data.in)
  
    this.BookingserviceService.update(this.bookingId, data).subscribe({
      next: (res) => {
        console.log('Booking updated successfully', res);
      },
      error: (e) => {
        console.error('Error updating Booking', e);
        this.errorstatus = e.status;
      }
    });
  }  
  //66ccbe1a31ad669bc35a2bdf
  //66cc6fed1ff630780fa11d1b
  deleteBooking():void{
    this.BookingserviceService.delete(this.bookingId).subscribe({
      next: (res) => {
        console.log('Booking deleted successfully', res);
      },
      error: (e) => {
        console.error('Error deleted Booking', e);
        this.errorstatus = e.status;
      }
    });
  }
  reset():void{
    this.in="";
    this.out="";
    this.bookingId="";
    this.ngOnInit();
  }
}
