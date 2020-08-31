import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Company } from '../dto/company';

@Component({
  selector: 'app-sell-offers',
  templateUrl: './sell-offers.component.html',
  styleUrls: ['./sell-offers.component.css']
})
export class SellOffersComponent implements OnInit {

  // TODO: wszystko

  form: any = {};
  sellOffers: any;
  companies: Company[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getSellOffers().subscribe(
      data => {
        this.sellOffers = data;
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
    console.log(this.form);
  }

}
