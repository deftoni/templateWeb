import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../../config/config';


@Injectable({
  providedIn: 'root'
})
export class EmailsService {
  private config = new Config();
  constructor(private http: HttpClient ) { }

  sendEmail(ContentEmailToSend: FormData) {
    console.log('Welcome in the service, here is what you can use: ', ContentEmailToSend);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/X-www-form-urlencoded');
    this.http.post<{ message: string}>(`${this.config.getEmailUrl()}`,
    ContentEmailToSend, {headers: headers}).subscribe((data) => {
      console.log(data.message);
   });
  }
}
