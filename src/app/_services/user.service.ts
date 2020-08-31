import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = "http://localhost:8080/api/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<any> {
    return this.http.get('http://localhost:8080/companies', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL, { responseType: 'text' });
  }

  getBuyOffers(): Observable<any> {
    return this.http.get(API_URL + '/buyOffers', { responseType: 'text' });
  }
  
  getSellOffers(): Observable<any> {
    return this.http.get(API_URL + '/sellOffers', { responseType: 'text' });
  }

  getResources(): Observable<any> {
    return this.http.get(API_URL + '/resources', { responseType: 'text' });
  }

}
