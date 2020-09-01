import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Company } from '../dto/company';
import { BuyOffer } from '../dto/buyOffer'

@Component({
  selector: 'app-buy-offers',
  templateUrl: './buy-offers.component.html',
  styleUrls: ['./buy-offers.component.css']
})
export class BuyOffersComponent implements OnInit {

  form: any = {};
  companies: Company[];
  buyOffers: BuyOffer[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getBuyOffers().subscribe(
      data => {
        this.buyOffers = JSON.parse(data).buyOffers;
      },
      err => {
        this.buyOffers = JSON.parse(err.error).message;
      }
    );
    this.userService.getCompanies().subscribe(
      data => {
        this.companies = JSON.parse(data);
      },
      err => {
        this.companies = JSON.parse(err.error).message;
      }
    );
  }

  onSubmit(): void{
    this.userService.postBuyOffer(this.form).subscribe();
  }

}
