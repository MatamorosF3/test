import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'

import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { ListCategoryComponent } from './list-category/list-category.component';
// import { CategoryService } from '../../category.service'

@NgModule({
  declarations: [AddCategoryComponent, EditCategoryComponent, ListCategoryComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:[
    AddCategoryComponent,
    EditCategoryComponent
  ]
  // providers:[CategoryService]
})
export class CategoryModule { }
