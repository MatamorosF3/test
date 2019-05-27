import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  users: User[];
  constructor(
    private userService: UserService,
    private router: Router,
    private data: DataService,
  ) { }

  ngOnInit() {
    this.data.changeTitle("Users");
    this.userService.getUsers().subscribe( (users: User[]) => {
      this.users = users;
    });
  }

  editUser(userId){
    this.router.navigate(['/edit-user'], { queryParams: { userId: userId } });
  }

  deleteUser(userId){
    this.userService.deleteUser(userId).subscribe( () => {
      const userIndex = this.users.findIndex( (user) => user.id === userId);
      this.users.splice(userIndex, 1);
    });
  }

}
