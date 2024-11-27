import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Hotel } from '../common/hotel';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminSigninService {
  private baseUrl1 = `${environment.apiUrl}/admin/login`;
  private baseUrl2 = `${environment.apiUrl}/admin/backuplogin`;

  constructor(private httpClient: HttpClient) { }

login(data: any): Observable<any> {
  return this.httpClient.post(this.baseUrl1, data);
}
backuplogin(data: any): Observable<any> {
  return this.httpClient.post(this.baseUrl2, data);
}
}
