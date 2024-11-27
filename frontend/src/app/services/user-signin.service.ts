import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Hotel } from '../common/hotel';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment'; 


@Injectable({
  providedIn: 'root'
})
export class UserSigninService {
  private baseUrl = `${environment.apiUrl}/login`;
  private baseUrl2 = `${environment.apiUrl}/backuplogin`;

  constructor(private httpClient: HttpClient) { }

login(data: any): Observable<any> {
  return this.httpClient.post(this.baseUrl, data);
}
backuplogin(data: any): Observable<any> {
  return this.httpClient.post(this.baseUrl2, data);
}

}
