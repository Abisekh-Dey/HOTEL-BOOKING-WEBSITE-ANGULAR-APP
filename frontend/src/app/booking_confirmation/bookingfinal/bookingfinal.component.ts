import { Component } from '@angular/core';
import { BookingserviceService } from '../../services/bookingservice.service';
import { Booking } from '../../common/booking';
import { AuthService} from '../../services/auth-service.service';


@Component({
  selector: 'app-bookingfinal',
  templateUrl: './bookingfinal.component.html',
  styleUrl: './bookingfinal.component.css'
})
export class BookingfinalComponent {
  booking:Booking = {
    userId:null,
    roomId: null,
    checkIn: null,
    checkOut: null,
    guests: []
  };
  room_type:string|null="";
  room_price:number=0;
  room_ac:string|null="";
  room_number:string|null="";
  today: Date = new Date();
  actualdate: string = "";
  hotelId: string|null = "";
  hotelname:string|null= "";
  errorstatus:number=0;
  gst:number=0;

  constructor(private AuthService:AuthService,private BookingserviceService:BookingserviceService) { }

  ngOnInit(): void {
      this.booking.userId=this.AuthService.getUserId();
      this.booking.roomId=this.AuthService.getroomId();
      this.booking.checkIn=this.AuthService.getcin();
      this.booking.checkOut=this.AuthService.getcout();
      this.booking.guests=this.AuthService.getguest();
      this.room_type=this.AuthService.getroomtype();
      this.room_price=Number(this.AuthService.getroomprice());
      this.room_ac=this.AuthService.getroomac();
      this.room_number=this.AuthService.getroomnumber();
      this.hotelId=this.AuthService.gethotelId();
      this.hotelname=this.AuthService.gethotelname();
      this.gst=this.AuthService.getroomgst();
      this.actualdate=`${this.today.getDate()}/${this.today.getMonth()+1}/${this.today.getFullYear()}`
}

saveBooking(): void {
  const data = {
    userId: this.booking.userId,
    roomId: this.booking.roomId,
    checkInDate: this.booking.checkIn,
    checkOutDate: this.booking.checkOut,
    guests: this.booking.guests
  };

  this.BookingserviceService.create(data).subscribe({
    next: (res) => {
      console.log('Booking created successfully', res);
      // this.submitted = true;
    },
    error: (e) => {
      console.error('Error creating booking', e);
      this.errorstatus = e.status;
    }
  });
}
reset():void{
  this.errorstatus=0;
}
// reset():void{
//   this.booking.checkIn=null;
//   this.booking.checkOut=null;
//   this.booking.roomId=null;
//   this.person_count=0;
//   this.booking.guests=[];
// }
}