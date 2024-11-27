import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../common/hotel';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AdminSignupService {
  private baseUrl = 'https://hotel-booking-website-angular-app-backend.onrender.com/admin/signup';
  //private baseUrl2 = 'http://localhost:5000/hotel/';
  constructor(private httpClient: HttpClient) { }

create(data: any): Observable<any> {
  return this.httpClient.post(this.baseUrl,data);
}
}
