import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { DataService } from 'src/app/data.service';
import { CategoryService } from 'src/app/category.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/Category';
import { UserService } from 'src/app/user.service';
import { Role } from 'src/app/models/Role';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  addForm: FormGroup;
  submitted: boolean = false;
  index: number;

  constructor(
    private data: DataService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.data.changeTitle("Add User")

    this.addForm = this.formBuilder.group({
      id: [],
      username: ['', [Validators.required, Validators.pattern('^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$')]],
      role: ['', Validators.required, ]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.addForm.controls.role.setValue(["VIEWER", "EDITOR", "ADMIN"][this.index]);
    console.log(this.addForm.value)

    if (this.addForm.valid) {
      this.userService.addUser(this.addForm.value)
        .subscribe(data => {
          this.router.navigate(['/user']);
        });
    }
  }

  get roles() {
    return Role;
  }

  updateRole(event) {
    this.index = event.target.value;
  }

  get f() { return this.addForm.controls; }


}
