import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Company } from '../dto/company';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form: any = {};
  companies: Company[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
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
    this.userService.postCompany(this.form).subscribe(
      () => {this.reloadPage()}
    );
  }

  reloadPage(){
    window.location.reload();
  }

}
