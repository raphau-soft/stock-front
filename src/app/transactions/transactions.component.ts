import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  constructor(private userService: UserService) { }

  data: any;

  ngOnInit(): void {
      this.userService.getTransactions().subscribe(
        data => {this.data = data; console.log(data);}
      )
  }

}
