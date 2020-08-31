import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Company } from '../dto/company';

const API_URL = "http://localhost:8080/api/user";
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

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

  postCompany(company): Observable<any>{
    return this.http.post('http://localhost:8080/company', {
      id: 0,
      name: company.name,
      amount: company.amount,
      price: company.price
    }, httpOptions);
  }

  postBuyOffer(buyOffer): Observable<any>{
    console.log(buyOffer);
    return this.http.post('http://localhost:8080/api/buyOffer', {
      id: 0,
      company_id: buyOffer.company.id,
      maxPrice: buyOffer.maxPrice,
      amount: buyOffer.amount,
      dateLimit: buyOffer.date
    }, httpOptions);
  }

}
