import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from 'src/app/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  userId: number;
  editForm: FormGroup;
  submitted: boolean = false;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private data: DataService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.data.changeTitle("Edit User");

    this.editForm = this.formBuilder.group({
      id: [],
      username: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.route.queryParams
      .subscribe(params => {
        let userId = params['userId'];
        if (!userId) {
          this.router.navigate(['']);
        }
        this.userId = userId;
        this.userService.getUser(userId).subscribe( (user: User) => {
          this.editForm.patchValue(user);
        })
      });
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.editForm.value)

    if(this.editForm.valid){
      this.userService.editUser(this.editForm.value)
      .subscribe( data => {
        this.router.navigate(['']);
      });
    }
  }

  get f() { return this.editForm.controls; }

}
