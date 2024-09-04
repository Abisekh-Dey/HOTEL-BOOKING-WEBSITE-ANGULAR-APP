import { Component } from '@angular/core';
import { Hotel } from '../../common/hotel';
import { Room } from '../../common/room';
import { RoomService } from '../../services/room.service';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-add-hotel-component',
  templateUrl: './add-hotel-component.component.html',
  styleUrl: './add-hotel-component.component.css'
})
export class AddHotelComponentComponent {
  hotel: Hotel = {
    name: '',
    location:"",
    images:""
  };
  room: Room = {
    number: '',
    type:"",
    price:0,
    isAc:"",
    hotelId:"",
    images:[]
  };
  hotels: Hotel[] = [];
  rooms: any[] = [];
  hotelbyid: any[] = [];
  submitted = false;
  errorstatus:number= 0;
  updateError:number=0;
  findError:number=0;
  hotel_id:string="";
  updateClicked=false;
  updated=false;
  id:string="";
  deletedid:string="";
  // counter: number = 1;

  constructor(private hotelService: HotelService,private roomService: RoomService) { }
  ngOnInit() {
    this.listhotels();
  }

  listhotels() {
    // this.counter = 1;
    this.hotelService.getHotelList().subscribe(
      data => {
        // data.forEach(hotel => {
        //   console.log(hotel.images); // Access the _id property of each hotel
        // });
        this.hotels = data;
      }
    )
  }
  // getCounterValue(): number {
  //   // return this.counter++;
  // }
  // saveHotel(): void {
  //   const data = {
  //     name: this.hotel.name,
  //     location: this.hotel.location,
  //     images: this.hotel.images
  //   };

  //   this.hotelService.create(data)
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.submitted = true;
  //         // window.location.reload();
  //         if(this.errorstatus!==0){
  //           this.errorstatus=0;
  //         }
  //       },
  //       error: (e) => {
  //         console.error(e);
  //         this.errorstatus=e.status;
  //         console.log(this.errorstatus);
  //         // this.invalidadmin=true;
  //       }
  //     });
  // }
  saveHotel(): void {
    this.errorstatus=0;
    this.updateError=0;
    const data = {
      name: this.hotel.name,
      location: this.hotel.location,
      images: this.hotel.images
    };
  
    this.hotelService.create(data).subscribe({
      next: (res) => {
        console.log('Hotel added successfully', res);
        this.hotels.push(res); // Add the new hotel to the list
        this.submitted = true;
      },
      error: (e) => {
        console.error('Error adding hotel', e);
        this.errorstatus = e.status;
      }
    });
  }
  
  updateClick(x:any,name:string,location:string):void{
    this.id="";
    this.hotelbyid=[];
    this.updated=true;
    this.updateError=0;
    this.hotel.images="";
    this.updateClicked=true;
    this.hotel_id=x;
    if(this.submitted!==false){
      this.submitted=false;
    }
    if(this.updateClicked){
      this.populateFormWithExistingData(name,location);
    }
    console.log(x);
    };
  
  populateFormWithExistingData(name:string,location:string) {
    this.hotel.name = name;
    this.hotel.location = location;
  }

  // updateHotel():void{
  //   console.log(this.hotel_id);
  //   const data = {
  //     name: this.hotel.name,
  //     location: this.hotel.location,
  //     images: this.hotel.images
  //   };

  //   this.hotelService.update(this.hotel_id,data)
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.submitted = true;
  //         if(this.updateError!==0){
  //           this.updateError=0;
  //         }
  //       },
  //       error: (e) => {
  //         console.error(e);
  //         this.updateError=e.status;
  //         console.log(this.updateError);
  //         // this.invalidadmin=true;
  //       }
  //     });
  // }
  updateHotel(): void {
    const data = {
      name: this.hotel.name,
      location: this.hotel.location,
      images: this.hotel.images
    };
  
    this.hotelService.update(this.hotel_id, data).subscribe({
      next: (res) => {
        console.log('Hotel updated successfully', res);
        const index = this.hotels.findIndex(h => h._id === this.hotel_id);
        if (index !== -1) {
          this.hotels[index] = res; // Update the hotel in the list
        }
        this.submitted = true;
        this.updateClicked = false;
        this.updated = true;
      },
      error: (e) => {
        console.error('Error updating hotel', e);
        this.updateError = e.status;
        // sconsole.log(this.updateError);
      }
    });
  }
  
  getHotelbyId():void{
    // console.log(this.id);
    if(this.id!==""){
      this.findError=0;
      this.hotelService.get(this.id).subscribe({
        next: (res) =>{
          console.log(res);
          this.hotelbyid.push(res);
          console.log(this.hotelbyid)
        },
        error: (e) =>{
          console.error(e);
          this.findError=e.status;
          console.log(this.findError);
          // this.invalidadmin=true;
        }
    })
    }
    else{
      this.findError=422;
    }
  }
  getAllRooms(x:any):void{
    this.room.hotelId=x;
    this.roomService.get(this.room.hotelId).subscribe({
      next:(res)=>{
        this.rooms.push(res);
        console.log(this.rooms);
      },
      error:(e)=>{
        console.error('Error adding room', e);
        this.errorstatus = e.status;
      }
    })
  }
  reset1():void{
    this.id="";
    this.hotelbyid=[];
    this.room.hotelId="";
    this.rooms=[];
    this.errorstatus=0;
    this.ngOnInit()
  }
  reset():void{
    this.id="";
    this.hotelbyid=[];
  }
  deleteClick(x:any):void{
    this.id="";
    this.hotelbyid=[];
    this.hotel_id=x;
    console.log(this.hotel_id);
  }
  // deleteHotel():void{
  //   this.hotelService.delete(this.hotel_id).subscribe(
  //     data=>{
  //       console.log(data);
  //     })
  // }
  // reload():void{
  //   window.location.reload()
  // }
  deleteHotel(): void {
    if (this.hotel_id) {
      this.deletedid=this.hotel_id;
      this.hotelService.delete(this.hotel_id).subscribe({
        next: (res) => {
          console.log('Hotel deleted successfully');
          this.hotels = this.hotels.filter(hotel => hotel._id !== this.hotel_id); // Remove the deleted hotel from the list
          this.hotel_id = "";
        },
        error: (e) => {
          console.error('Error deleting hotel', e);
        }
      });
    }
  }
  deleteId():void{
    this.deletedid="";
  }
  newHotel(): void {
    // window.location.reload();
    this.errorstatus=0;
    this.updateError=0;
    this.submitted = false;
    this.updated = false;
    this.hotel = {
      name: '',
      location:"",
      images:""
    };
  }
}
