import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../common/room';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RoomService {


  private baseUrl1 = 'http://localhost:5000/room';
  private baseUrl2 = 'http://localhost:5000/hotel/room';
  constructor(private httpClient: HttpClient) { }

  // getRoomList(): Observable<Room[]> {
  //   return this.httpClient.get<Room[]>(this.baseUrl1);
  // }

get(id:any): Observable<Room> {
  return this.httpClient.get<Room>(`${this.baseUrl1}/${id}`);
}

getbyid(hid:any,id:any): Observable<Room> {
  return this.httpClient.get<Room>(`${this.baseUrl2}/${hid}/${id}`);
}

createRoom(id:any,data: any): Observable<any> {
  return this.httpClient.post(`${this.baseUrl1}/${id}`, data);
}

update(id: any, data: any): Observable<any> {
  return this.httpClient.patch(`${this.baseUrl1}/${id}`, data);
}

delete(id: any): Observable<any> {
  return this.httpClient.delete(`${this.baseUrl1}/${id}`);
}


}
interface GetResponse {
  _embedded: {
    rooms: Room[];
  }
}