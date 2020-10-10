import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  data: String;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  runTests(){
        this.userService.getTest().subscribe(
          data => {
            this.data = JSON.stringify(data);
          }
        )
  }

}
