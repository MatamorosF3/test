import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/post.service';
import { CategoryService } from 'src/app/category.service';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  categoryId: number;
  editForm: FormGroup;
  submitted: boolean = false;
  category: Category;
  posts: Post[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private data: DataService,
    private formBuilder: FormBuilder,
    private postService: PostService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.data.changeTitle("Edit Category");

    // this.postService.getPosts().subscribe((data: Post[]) => {
    //   this.posts = data;
    // });

    this.editForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      // text: ['', Validators.required],
      // categories: ['', Validators.required]
    });

    this.route.queryParams
      .subscribe(params => {
        let categoryId = params['categoryId'];
        if (!categoryId) {
          this.router.navigate(['']);
        }
        this.categoryId = categoryId;
        this.categoryService.getCategory(categoryId).subscribe( (category: Category) => {
          this.editForm.patchValue(category);
        })
      });
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.editForm.value)

    if(this.editForm.valid){
      this.categoryService.editCategory(this.editForm.value)
      .subscribe( data => {
        this.router.navigate(['']);
      });
    }
  }

  get f() { return this.editForm.controls; }


}
