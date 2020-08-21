import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'stock';
  private roles: string[];
  isLoggedIn = false;
  username: string;

  constructor(private token: TokenStorageService){}

  ngOnInit(): void{
    this.isLoggedIn = !!this.token.getToken();

    if(this.isLoggedIn){
      const user = this.token.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }
  }

  logout(): void{
    this.token.signOut();
    window.location.reload();
  }
}
