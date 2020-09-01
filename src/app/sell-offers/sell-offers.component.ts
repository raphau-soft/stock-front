import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Company } from '../dto/company';
import { SellOffer } from '../dto/sellOffer';

@Component({
  selector: 'app-sell-offers',
  templateUrl: './sell-offers.component.html',
  styleUrls: ['./sell-offers.component.css']
})
export class SellOffersComponent implements OnInit {

  // TODO: wszystko

  form: any = {};
  sellOffers: SellOffer[];
  companies: Company[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getSellOffers().subscribe(
      data => {
        this.sellOffers = JSON.parse(data).sellOffers;
      },
      err => {
        this.sellOffers = JSON.parse(err.error).message;
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
    this.userService.postSellOffer(this.form).subscribe();
  }

}
