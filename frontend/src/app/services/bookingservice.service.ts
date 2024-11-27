import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../common/booking';


@Injectable({
  providedIn: 'root'
})
export class BookingserviceService {
  private baseUrl = 'https://hotel-booking-website-angular-app-backend.onrender.com/booking';
  private baseUrl2 = 'https://hotel-booking-website-angular-app-backend.onrender.com/bookings';
  constructor(private httpClient: HttpClient) { }

create(data: any): Observable<any> {
  return this.httpClient.post(this.baseUrl,data);
}
getBookingList(): Observable<Booking[]>{
  return this.httpClient.get<Booking[]>(this.baseUrl2);
}
getBookingListbyUser(id:any): Observable<any>{
  return this.httpClient.get<any>(`${this.baseUrl}/${id}`);
}
update(id: any, data: any): Observable<any> {
  return this.httpClient.patch(`${this.baseUrl}/${id}`, data);
}
delete(id: any): Observable<any> {
  return this.httpClient.delete(`${this.baseUrl}/${id}`);
}


}
