import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Company } from '../dto/company';
import { SellOffer } from '../dto/sellOffer';
import { Resource } from '../dto/resource';

@Component({
  selector: 'app-sell-offers',
  templateUrl: './sell-offers.component.html',
  styleUrls: ['./sell-offers.component.css']
})
export class SellOffersComponent implements OnInit {

  form: any = {};
  sellOffers: SellOffer[];
  companies: Company[] = [];
  isAddFailed = false;
  errorMessage: string;

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

    this.userService.getResources().subscribe(
      data => {
        this.getStocksCompanies(JSON.parse(data).stock);
      },
      err => {
        this.companies = JSON.parse(err.error).message;
      }
    );
  }

  onSubmit(): void{
    console.log(this.form.date);
    this.userService.postSellOffer(this.form).subscribe(
      () => {this.reloadPage()},
      err => {
        this.isAddFailed = true;
        this.errorMessage = err.error;
      }
    );
  }

  onDelete(sellOffer): void{
    this.userService.deleteSellOffer(sellOffer).subscribe(
      () => {this.reloadPage()}
    );
  }

  reloadPage(){
    window.location.reload();
  }

  getStocksCompanies(resources: Resource[]){
    for(let i = 0; i < resources.length; i++){
      this.companies.push(resources[i].company);
    }
  }

}
