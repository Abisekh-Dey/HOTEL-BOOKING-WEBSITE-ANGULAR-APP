import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../../common/room';
import { RoomService } from '../../services/room.service';
import { HotelService } from '../../services/hotel.service';
import { BookingserviceService } from '../../services/bookingservice.service';
import { Booking } from '../../common/booking';
import { Hotel } from '../../common/hotel';
import { AuthService} from '../../services/auth-service.service';


@Component({
  selector: 'app-room-info',
  templateUrl: './room-info.component.html',
  styleUrl: './room-info.component.css'
})
export class RoomInfoComponent {
  booking:Booking = {
    userId:null,
    roomId: null,
    checkIn: null,
    checkOut: null,
    guests: []
  };
  
  room: Room = {
    number: '',
    type:"",
    price:0,
    isAc:"",
    hotelId:"",
    images:[]
  };

  rooms: any[] = [];
  rooms_length:number=0;
  id: string="";
  image: string="";
  name: string="";
  location: string="";
  errorstatus: number=0;
  today:string='';
  roomId:string="";
  loggedIn=false;
  person_count:number=0;
  a:string="";
  b:string="";
  c:string="";
  d:string="";
  gst:number=0;

  constructor(private AuthService:AuthService,private BookingserviceService:BookingserviceService,private route: ActivatedRoute,private roomService: RoomService,private hotelService: HotelService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.name = params['name'];
      this.location = params['location'];
      this.image = params['image'];
      this.booking.userId = this.AuthService.getUserId();
      // this.booking.guests[0].contact = this.AuthService.getAdminContact();
      // this.booking.guests[0].name = this.AuthService.getAdminName();
      console.log(this.booking.userId)
      if(this.booking.userId){
        this.loggedIn=true;
      }
    });

    this.getAllRooms(this.id);
    this.formatDate();
  }
  formatDate():void {
    const date: Date =new Date()
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    this.today=`${day}/${month}/${year}`;
  }
  getAllRooms(id:any):void{
    this.room.hotelId=id;
    this.roomService.get(this.room.hotelId).subscribe({
      next:(res)=>{
        this.rooms.push(res);
        for(let i of this.rooms[0]){
          i.price=Number(i.price)-1;
          // console.log(this.rooms[0][0]._id);
        }
        this.rooms_length=this.rooms[0].length;
        // console.log(this.rooms_length)
        // console.log(Number(this.rooms[0][0].price)-1);
      },
      error:(e)=>{
        console.error('Error getting room', e);
        this.errorstatus = e.status;
      }
    })
  }

  bookClick(x:any,y:any,a:any,b:any,c:any,d:any,e:any):void{
    this.a=a;
    this.b=b;
    this.c=c;
    this.d=d;
    this.booking.roomId=x;
    this.person_count=Number(y);
    this.gst=Number(e);
    for(let i=0;i<this.person_count;i++){
      if(i==0){
        this.booking.guests.push({ name: this.AuthService.getAdminName(), age: 0, contact: this.AuthService.getAdminContact() });
      }
      else{
        this.booking.guests.push({ name: '', age: 0, contact: '' });
      }
      // this.booking.guests[i]={ name: '', age: 0, contact: '' };
    }
    // console.log(this.booking.roomId);
  }

  confirmClick():void{
    const data = {
      userId: this.booking.userId ?? '', // Providing a default empty string
      roomId: this.booking.roomId ?? '',
      checkInDate: this.booking.checkIn || new Date(), // Convert Date to string
      checkOutDate: this.booking.checkOut || new Date(), // Convert Date to string
      guests: this.booking.guests.map(guest => ({
        name: guest.name ?? '', // Default to empty string if null
        age: guest.age, // Assuming age is always a number
        contact: guest.contact ?? '' // Default to empty string if null
      }))
    };
    this.AuthService.setBookingData(data,this.a,this.b,this.c,this.d,this.id,this.name,this.gst);
  }
  reset():void{
    this.booking.checkIn=null;
    this.booking.checkOut=null;
    this.booking.roomId=null;
    this.person_count=0;
    this.booking.guests=[];
  }
}
