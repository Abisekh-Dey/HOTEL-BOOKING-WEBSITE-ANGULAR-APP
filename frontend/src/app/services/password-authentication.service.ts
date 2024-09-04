import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasswordAuthenticationService {
  private baseUrl1 = 'http://localhost:5000/authentication';
  private baseUrl2 = 'http://localhost:5000/updateauthenticationpassword';

  constructor(private httpClient: HttpClient) { }

authentication(data: any): Observable<any> {
  return this.httpClient.post(this.baseUrl1, data);
}
update(id:any,data: any): Observable<any> {
  return this.httpClient.patch(`${this.baseUrl2}/${id}`, data);
}
}
