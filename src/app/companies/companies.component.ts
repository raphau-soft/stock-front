import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ResourceRate } from '../dto/resourceRate';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  form: any = {};
  resourceRates: ResourceRate[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllResources().subscribe(
      data => {
        this.resourceRates = JSON.parse(data).stockRate;
      },
      err => {
        // this.resourceRates = JSON.parse(err.error).message;
      }
    );
  }

  onSubmit(): void{
    this.userService.postCompany(this.form).subscribe(
      () => {this.reloadPage()}
    );
  }

  reloadPage(){
    window.location.reload();
  }


}
