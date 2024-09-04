import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../common/feedback'

@Injectable({
  providedIn: 'root'
})
export class FeedbackserviceService {
  private baseUrl = 'http://localhost:5000/feedback';
  private baseUrl2 = 'http://localhost:5000/allfeedbacks';

  constructor(private httpClient: HttpClient) { }

create(data: any): Observable<any> {
  return this.httpClient.post(this.baseUrl,data);
}
getallfeedbacks(): Observable<Feedback[]> {
  return this.httpClient.get<Feedback[]>(this.baseUrl2);
}
}
