import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../common/hotel';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HotelService {


  private baseUrl = 'https://hotel-booking-website-angular-app-backend.onrender.com/hotel';
  private searchUrl = 'https://hotel-booking-website-angular-app-backend.onrender.com/hotels/search';
  private wishUrl = 'https://hotel-booking-website-angular-app-backend.onrender.com/wishlist';
  constructor(private httpClient: HttpClient) { }

getHotelList(): Observable<Hotel[]> {
  return this.httpClient.get<Hotel[]>(this.baseUrl);
}
getHotelsByLocation(location: string): Observable<Hotel[]> {
  return this.httpClient.get<Hotel[]>(`${this.searchUrl}?location=${location}`);
}
get(id:any ): Observable<Hotel> {
  return this.httpClient.get<Hotel>(`${this.baseUrl}/${id}`);
}

create(data: any): Observable<any> {
  return this.httpClient.post(this.baseUrl, data);
}

update(id: any, data: any): Observable<any> {
  return this.httpClient.patch(`${this.baseUrl}/${id}`, data);
}

delete(id: any): Observable<any> {
  return this.httpClient.delete(`${this.baseUrl}/${id}`);
}

createwish(data: any): Observable<any> {
  console.log(data);
  return this.httpClient.post(this.wishUrl, data);
}
getwishlistbyuserid(id:any ): Observable<any> {
  return this.httpClient.get<any>(`${this.wishUrl}/${id}`);
}
deletewishitem(id: any): Observable<any> {
  return this.httpClient.delete(`${this.wishUrl}/${id}`);
}
}
interface GetResponse {
  _embedded: {
    hotels: Hotel[];
  }
}
