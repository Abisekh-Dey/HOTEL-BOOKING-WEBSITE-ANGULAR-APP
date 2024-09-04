import { Component } from '@angular/core';
import { Hotel } from '../../common/hotel';
import { HotelService } from '../../services/hotel.service';
import { SearchserviceService } from '../../services/searchservice.service';
import { AuthService } from '../../services/auth-service.service';
import { AdminAuthService } from '../../services/admin-auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.css'
})
export class HotelListComponent {
  hotels: Hotel[] = [];
  x: any[]=[];
  isLogedin = false;

  destination:string="";
  checkInDate: string=""
  checkOutDate: string=""
  rooms: string=""
  guests: string=""
  pricePerNight: string=""
  // hotel_id:string="";
  hotel_name:string="";
  // hotel_images:string="";
  // hotel_location:string="";
  errorstatus:number=0;
  userId:string|null="";
  
  constructor(private AuthService:AuthService,private hotelService: HotelService,private searchServiceService:SearchserviceService,private adminAuthService:AdminAuthService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.isLogedin=this.adminAuthService.getLoginState();
    this.userId=this.AuthService.getUserId();
    // this.x.push(this.searchServiceService.getSearchData());
    // console.log(this.x[0].destination)
    this.route.queryParams.subscribe(params => {
      this.destination = params['destination'];
      this.checkInDate = params['checkInDate'];
      this.checkOutDate = params['checkOutDate'];
      this.rooms = params['rooms'];
      this.guests = params['guests'];
      this.pricePerNight = params['pricePerNight'];
    });
    this.listhotels();
  }
  
  listhotels() {
    const location=this.destination;
    // console.log(location);
    this.hotelService.getHotelsByLocation(location).subscribe(
      data => {
        // data.forEach(hotel => {
        //   console.log(hotel.images); // Access the _id property of each hotel
        // });
        this.hotels = data;
        console.log(this.hotels);
      }
    )
  }
  // getImageName(path: string): string {
  //   // Extract filename from path
  //   return path.split('\\').pop()?.split('/').pop() || '';
  // }
  addWishlist(hotel_id:any,hotel_name:any,hotel_images:any,hotel_location:any):void{
    this.hotel_name=hotel_name;
    const data ={
      userId:this.userId,
      hotelId:hotel_id,
      name:hotel_name,
      images:hotel_images,
      location:hotel_location
    }
    // console.log(data)

    this.hotelService.createwish(data).subscribe({
      next: (res) => {
        console.log('Hotel added to Wishlist successfully', res);
        // this.hotels.push(res); // Add the new hotel to the list
        // this.submitted = true;
      },
      error: (e) => {
        console.error('Error adding Wishlist', e);
        this.errorstatus = e.status;
      }
    });
  }
  // reset():void{
  //   this.hotel_id="";
  //   this.hotel_name="";
  //   this.hotel_images="";
  //   this.hotel_location=""
  // }

}
