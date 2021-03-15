import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  url: string;
  httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  get(key: string): Observable<any> {
    //const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    this.url = environment.volume_endpoint + '?q=' + key;
    return this.http.get(this.url, this.httpOptions);
  }

  constructor(private http: HttpClient) {}
}
