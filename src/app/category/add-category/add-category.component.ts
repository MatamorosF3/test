import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { DataService } from 'src/app/data.service';
import { PostService } from 'src/app/post.service';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { CategoryService } from 'src/app/category.service';

import { AuthenticationService } from 'src/app/authentication.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

    currentUser: User;
    posts: Post[];
    addForm: FormGroup;
    submitted: boolean = false;

    constructor(
      private data: DataService,
      private categoryService: CategoryService,
      private postService: PostService,
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService
    )
    {
       this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
     }

    ngOnInit() {
      this.data.changeTitle("Add Category")
      // this.PostService.getPosts().subscribe((data: Post[]) => {
      //   this.posts = data;
      // });

      this.addForm = this.formBuilder.group({
        id: [],
        name: ['', Validators.required],
      });
    }

    get isValid(){
        return ["ADMIN", "EDITOR"].indexOf(this.currentUser.role ) > -1
    }

    onSubmit(){
      this.submitted = true;
      console.log(this.addForm.value)

      if(this.addForm.valid){
        this.categoryService.addCategory(this.addForm.value)
        .subscribe( data => {
          this.router.navigate(['/category']);
        });
      }
    }

    get f() { return this.addForm.controls; }

}
