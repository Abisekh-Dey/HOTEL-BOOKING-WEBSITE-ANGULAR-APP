import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordAuthenticationService {
  private baseUrl1 = `${environment.apiUrl}/authentication`;
  private baseUrl2 = `${environment.apiUrl}/updateauthenticationpassword`;

  constructor(private httpClient: HttpClient) { }

authentication(data: any): Observable<any> {
  return this.httpClient.post(this.baseUrl1, data);
}
update(id:any,data: any): Observable<any> {
  return this.httpClient.patch(`${this.baseUrl2}/${id}`, data);
}
}
