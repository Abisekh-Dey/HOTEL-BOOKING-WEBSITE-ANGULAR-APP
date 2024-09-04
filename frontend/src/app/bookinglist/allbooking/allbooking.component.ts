import { Component } from '@angular/core';
import { Booking } from '../../common/booking';
import { BookingserviceService } from '../../services/bookingservice.service';

@Component({
  selector: 'app-allbooking',
  templateUrl: './allbooking.component.html',
  styleUrl: './allbooking.component.css'
})
export class AllbookingComponent {
  bookings:any[]=[];
  errorstatus=0;

  constructor(private BookingserviceService:BookingserviceService) { }
  
  ngOnInit() {
    this.listbookings();
  }

  listbookings() {
    this.BookingserviceService.getBookingList().subscribe(
      data => {
        this.bookings = data;
        console.log(this.bookings)
      }
    )
  }
}
