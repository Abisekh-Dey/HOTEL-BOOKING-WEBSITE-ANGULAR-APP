import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../common/feedback'

@Injectable({
  providedIn: 'root'
})
export class FeedbackserviceService {
  private baseUrl = 'https://hotel-booking-website-angular-app-backend.onrender.com/feedback';
  private baseUrl2 = 'https://hotel-booking-website-angular-app-backend.onrender.com/allfeedbacks';

  constructor(private httpClient: HttpClient) { }

create(data: any): Observable<any> {
  return this.httpClient.post(this.baseUrl,data);
}
getallfeedbacks(): Observable<Feedback[]> {
  return this.httpClient.get<Feedback[]>(this.baseUrl2);
}
}
