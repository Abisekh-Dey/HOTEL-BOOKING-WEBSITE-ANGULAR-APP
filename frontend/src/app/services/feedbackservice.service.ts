import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../common/feedback';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackserviceService {
  private baseUrl = `${environment.apiUrl}/feedback`;
  private baseUrl2 = `${environment.apiUrl}/allfeedbacks`;

  constructor(private httpClient: HttpClient) { }

create(data: any): Observable<any> {
  return this.httpClient.post(this.baseUrl,data);
}
getallfeedbacks(): Observable<Feedback[]> {
  return this.httpClient.get<Feedback[]>(this.baseUrl2);
}
}
