import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  value = 30;
  form: any = {
    stockPlay: 90,
    createCompany: 2,
    strategy: 'Random company, high price',
    createBuyOffer: 44,
    createSellOffer: 44,
    deleteBuyOffer: 5,
    deleteSellOffer: 5,
    continueStockPlaying: 90,
    logout: 10,
    dataCheck: 10,
    checkBuyOffers: 33,
    checkSellOffers: 33,
    checkUserData: 34
  };

  strategies: string[] = ['Random company, high price', 'Random companies, random prices', 'Random companies, low prices'];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  runTests() {
    
  }

  

}
