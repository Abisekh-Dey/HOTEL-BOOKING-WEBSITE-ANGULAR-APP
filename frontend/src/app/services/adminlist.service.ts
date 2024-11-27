import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminSignup } from '../common/admin_signup';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AdminlistService {
  private baseUrl = `${environment.apiUrl}/admin`;
  
  constructor(private httpClient: HttpClient) { }

  getAdminList(): Observable<AdminSignup[]> {
    return this.httpClient.get<AdminSignup[]>(this.baseUrl);
}
update(id: any, data: any): Observable<any> {
  return this.httpClient.patch(`${this.baseUrl}/update/${id}`, data);
}
delete(aid: any,did: any): Observable<any> {
  return this.httpClient.delete(`${this.baseUrl}/${aid}/delete/${did}`);
}

}
