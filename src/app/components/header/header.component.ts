import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/authentication.service';
import { User } from 'src/app/models/User';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  constructor(private router: Router,
    private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    // this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
    //     this.userFromApi = user;
    // });
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === "ADMIN";
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
