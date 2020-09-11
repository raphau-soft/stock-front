import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Resource } from '../dto/resource';
import { ResourceRate } from '../dto/resourceRate';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  resources: Resource[];
  resourceRates: ResourceRate[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getResources().subscribe(
      data => {
        this.resources = JSON.parse(data).stock;
        this.resourceRates = JSON.parse(data).stockRate;
      },
      err => {
        this.resources = err.error.message;
      }
    );
  }

}
