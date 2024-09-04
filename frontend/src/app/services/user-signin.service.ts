import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Hotel } from '../common/hotel';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserSigninService {
  private baseUrl = 'http://localhost:5000/login';
  private baseUrl2 = 'http://localhost:5000/backuplogin';

  constructor(private httpClient: HttpClient) { }

login(data: any): Observable<any> {
  return this.httpClient.post(this.baseUrl, data);
}
backuplogin(data: any): Observable<any> {
  return this.httpClient.post(this.baseUrl2, data);
}

}
