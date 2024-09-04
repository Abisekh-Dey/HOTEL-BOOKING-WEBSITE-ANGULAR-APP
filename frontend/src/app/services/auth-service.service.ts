import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private adminName: string = '';
  private uid:string | null = '';
  private email:string | null = '';
  private contact_no:string | null = '';
  private roomId:string | null = '';
  private checkInDate:Date | null = null;
  private checkOutDate:Date | null = null;
  private guests: Array<{ name: string; age: number; contact: string }>=[];
  private room_type:string|null="";
  private room_price:string|null="";
  private room_ac:string|null="";
  private room_number:string|null="";
  private hotelId:string|null="";
  private hotelname:string|null="";
  private gst:number=0;


  constructor() {}

  login(adminName: string,id: string,contact_no: string,email: string): void {
    this.isLoggedIn = true;
    this.uid = id;
    this.contact_no = contact_no;
    this.adminName = adminName;
    this.email = email;
  }

  setBookingData(data: { 
    roomId: string; 
    checkInDate: Date; 
    checkOutDate: Date; 
    guests: Array<{ name: string; age: number; contact: string }>
  },a:string,b:string,c:string,d:string,hid:string,hname:string,gst:number): void {
    this.roomId = data.roomId;
    this.checkInDate = data.checkInDate;
    this.checkOutDate = data.checkOutDate;
    this.guests = data.guests;
    this.room_type = a;
    this.room_price = b;
    this.room_ac = c;
    this.room_number = d;
    this.hotelId = hid;
    this.hotelname = hname;
    this.gst = gst;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.adminName = "";
    this.uid = null;
    this.contact_no = null;
    this.email = null;
  }

  getLoginState(): boolean {
    return this.isLoggedIn;
  }

  getAdminName(): string{
    return this.adminName;
  }

  getUserId(): string | null {
    // console.log(this.aid);
    return this.uid;
  }
  getUserEmail(): string | null {
    // console.log(this.aid);
    return this.email;
  }
  getAdminContact(): string | null {
    // console.log(this.aid);
    return this.contact_no;
  }
  getroomgst(): number {
    // console.log(this.aid);
    return this.gst;
  }
  gethotelId(): string | null {
    // console.log(this.aid);
    return this.hotelId;
  }
  gethotelname(): string | null {
    // console.log(this.aid);
    return this.hotelname;
  }
  getroomtype(): string | null {
    // console.log(this.aid);
    return this.room_type;
  }
  getroomprice(): string | null {
    // console.log(this.aid);
    return this.room_price;
  }
  getroomac(): string | null {
    // console.log(this.aid);
    return this.room_ac;
  }
  getroomnumber(): string | null {
    // console.log(this.aid);
    return this.room_number;
  }
  getroomId(): string | null {
    // console.log(this.aid);
    return this.roomId;
  }
  getcin(): Date | null {
    // console.log(this.aid);
    return this.checkInDate;
  }
  getcout(): Date | null {
    // console.log(this.aid);
    return this.checkOutDate;
  }
  getguest(): Array<{ name: string; age: number; contact: string }>{
    // console.log(this.aid);
    return this.guests;
  }
}
