import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasswordAuthenticationService {
  private baseUrl1 = 'https://hotel-booking-website-angular-app-backend.onrender.com/authentication';
  private baseUrl2 = 'https://hotel-booking-website-angular-app-backend.onrender.com/updateauthenticationpassword';

  constructor(private httpClient: HttpClient) { }

authentication(data: any): Observable<any> {
  return this.httpClient.post(this.baseUrl1, data);
}
update(id:any,data: any): Observable<any> {
  return this.httpClient.patch(`${this.baseUrl2}/${id}`, data);
}
}
