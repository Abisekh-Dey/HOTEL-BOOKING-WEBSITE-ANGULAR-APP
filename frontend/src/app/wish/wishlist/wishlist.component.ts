import { Component } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  wishes:any[] = [];
  userId:string|null="";
  errorstatus:number=0;
  isdeleted=false;

  constructor(private hotelService: HotelService,private route: ActivatedRoute){}
  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.userId = params['userid'];})
      // console.log(this.userId)
      this.listwishes()
    
  }

  listwishes() {
    // console.log(location);
    this.hotelService.getwishlistbyuserid(this.userId).subscribe(
      data => {
        // data.forEach(hotel => {
        //   console.log(hotel.images); // Access the _id property of each hotel
        // });
        this.wishes=data.wishlist;
        console.log(this.wishes);
      }
    )
  }

  delete(x:any):void{
    this.hotelService.deletewishitem(x).subscribe({
      next: (res) => {
        console.log('Wishlist Item Deleted successfully', res);
        this.isdeleted = true;
      },
      error: (e) => {
        console.error('Error deleting Wishlist Item', e);
        this.errorstatus = e.status;
      }
    });
  }

  reset():void{
    this.isdeleted=false;
    this.errorstatus=0;
    this.ngOnInit();
  }
}
