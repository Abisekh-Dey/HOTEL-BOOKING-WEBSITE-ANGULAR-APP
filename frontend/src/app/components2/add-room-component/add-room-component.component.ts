import { Component } from '@angular/core';
import { Room } from '../../common/room';
import { RoomService } from '../../services/room.service';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../common/hotel';

@Component({
  selector: 'app-add-room-component',
  templateUrl: './add-room-component.component.html',
  styleUrl: './add-room-component.component.css'
})
export class AddRoomComponentComponent {
  room: Room = {
    number: '',
    type:"",
    price:0,
    isAc:"",
    hotelId:"",
    images:[]
  };
  submitted = false;
  hotels: Hotel[] = [];
  rooms: any[] = [];
  hotelbyid: any[] = [];
  roombyid: any[] = [];
  id:string="";
  hotel_id:string="";
  room_id:string="";
  hid:string="";
  rid:string="";
  errorstatus:number= 0;
  isUpdate=false;
  
  constructor(private roomService: RoomService,private hotelService: HotelService) { }
  
  ngOnInit() {
    this.listhotels();
  }

  listhotels() {
    this.hotelService.getHotelList().subscribe(
      data => {
        this.hotels = data;
      }
    )
  }
  addClick(id:any){
    this.room.hotelId=id;
  }
  addAnother():void{
    this.errorstatus=0;
    this.submitted=false;
    this.room.number="";
    this.room.type="";
    this.room.price=0;
    this.room.isAc="";
    this.room.images=[];
  }
  updateClick(room_id:string,rnumber:string,type:string,price:number,isAc:string):void{
    this.room.roomId=room_id;
    this.room.number=rnumber;
    this.room.type=type;
    this.room.price=price;
    this.room.isAc=isAc;
    this.isUpdate=true;
  }
  deleteClick(hotelId:string,room_id:string):void{
    this.hid=hotelId;
    this.rid=room_id;
    // console.log(this.hid)
    // console.log(this.rid)
  }
  saveRoom(): void {
    const data = {
      number: this.room.number,
      type: this.room.type,
      price: this.room.price,
      isAc: this.room.isAc,
      images: this.room.images
    };
    console.log(data.type);
    this.roomService.createRoom(this.room.hotelId, data).subscribe({
      next: (res) => {
        console.log('Room added successfully', res);
        this.submitted = true;
      },
      error: (e) => {
        console.error('Error adding room', e);
        this.errorstatus = e.status;
      }
    });
  }
  
  getAllRooms(x:any):void{
    this.room.hotelId=x;
    this.roomService.get(this.room.hotelId).subscribe({
      next:(res)=>{
        this.rooms.push(res);
        console.log(this.rooms);
      },
      error:(e)=>{
        console.error('Error getting room', e);
        this.errorstatus = e.status;
      }
    })
  }
  getRoombyId(hotel_id:any,room_id:any):void{
    this.hotel_id=hotel_id;
    this.room_id=room_id;
    if(this.hotel_id!=="" && this.room_id!==""){
      this.roomService.getbyid(this.hotel_id,this.room_id).subscribe({
        next: (res) =>{
          // console.log(res);
          this.roombyid.push(res);
          console.log(this.roombyid)
        },
        error: (e) =>{
          // console.error(e);
          this.errorstatus=e.status;
          // console.log(this.errorstatus);
          // this.invalidadmin=true;
        }
    })
    }
    else{
      this.errorstatus=422;
    }
  }
  getHotelbyId(hotel_search_id:any):void{
    this.id=hotel_search_id;
    if(this.id!==""){
      this.hotelService.get(this.id).subscribe({
        next: (res) =>{
          console.log(res);
          this.hotelbyid.push(res);
          console.log(this.hotelbyid)
        },
        error: (e) =>{
          console.error(e);
          this.errorstatus=e.status;
          console.log(this.errorstatus);
          // this.invalidadmin=true;
        }
    })
    }
    else{
      this.errorstatus=422;
    }
  }
  updateRoom():void{
    const data = {
      number: this.room.number,
      type: this.room.type,
      price: this.room.price,
      isAc: this.room.isAc,
      images: this.room.images
    };
  
    this.roomService.update(this.room.roomId, data).subscribe({
      next: (res) => {
        console.log('Room updated successfully', res);
        this.submitted = true;
      },
      error: (e) => {
        console.error('Error updating room', e);
        this.errorstatus = e.status;
      }
    });
  }
  deleteRoom():void{
    this.roomService.delete(this.rid).subscribe({
      next: (res) => {
        console.log('Room Deleted successfully', res);
        // this.submitted = true;
      },
      error: (e) => {
        console.error('Error deleting room', e);
        this.errorstatus = e.status;
      }
    });
  }
  reset():void{
    this.submitted = false;
    this.room = {
      number: '',
      type:"",
      price:0,
      isAc:"",
      hotelId:"",
      images:[]
    };
    this.isUpdate=false;
    this.rooms=[];
    this.hotelbyid=[];
    this.id="";
    this.rid="";
    this.hid="";
    this.errorstatus= 0;
    this.hotel_id="";
    this.room_id="";
    this.roombyid = [];
    this.ngOnInit();
  }
}
