import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSignup } from '../common/user_signup';
import { Hotel } from '../common/hotel';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserSignupService {
  private baseUrl = 'http://localhost:5000/signup';
  private baseUrl2 = 'http://localhost:5000/users';
  constructor(private httpClient: HttpClient) { }

create(data: any): Observable<any> {
  return this.httpClient.post(this.baseUrl, data);
}
getUserList(): Observable<UserSignup[]> {
  return this.httpClient.get<UserSignup[]>(this.baseUrl2);
}
update(id: any, data: any): Observable<any> {
  return this.httpClient.patch(`${this.baseUrl2}/update/${id}`, data);
}
}
