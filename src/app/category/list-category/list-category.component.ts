import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { Category } from 'src/app/models/Category';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

import { AuthenticationService } from 'src/app/authentication.service';
import { User } from 'src/app/models/User';


@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {
  categories: Category[];
  currentUser: User;
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private data: DataService,
    private authenticationService: AuthenticationService
  )
  {this.authenticationService.currentUser.subscribe(x => this.currentUser = x); }

  ngOnInit() {
    this.data.changeTitle("Categories");

    this.categoryService.getCategories().subscribe( (categories: Category[]) => {
      this.categories = categories;
    });
  }

  editCategory(categoryId){
    this.router.navigate(['/edit-category'], { queryParams: { categoryId: categoryId } });
  }

  deleteCategory(categoryId){
    this.categoryService.deleteCategory(categoryId).subscribe( () => {
      const categoryIndex = this.categories.findIndex( (category) => category.id === categoryId);
      this.categories.splice(categoryIndex, 1);
    });
  }

  get isViewer(){
      return this.currentUser.role == 'VIEWER';
  }

}
