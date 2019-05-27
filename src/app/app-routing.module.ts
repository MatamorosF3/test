import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { PostsListsComponent } from './components/posts-lists/posts-lists.component';
import { LoginComponent } from './components/login/login.component';

// Category componentes
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';

// User components
import { AddUserComponent } from './user/add-user/add-user.component'
import { ListUserComponent } from './user/list-user/list-user.component'
import { EditUserComponent } from './user/edit-user/edit-user.component'

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [AuthGuard],
    // data: { roles: ["ADMIN", "VIEWER", "EDITOR"] }
  },
  {
    path:'post',
    component: PostsListsComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN", "VIEWER", "EDITOR"] }
  },
  {
    path: 'add-post',
    component: AddPostComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN", "EDITOR"] }
  },
  {
    path: 'edit-post',
    component: EditPostComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN", "EDITOR"] }
  },
  {
    path:'category',
    component: ListCategoryComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN", "VIEWER", "EDITOR"] }
  },
  {
    path:'add-category',
    component: AddCategoryComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN", "EDITOR"] }
  },
  {
    path:'edit-category',
    component: EditCategoryComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN", "EDITOR"] }
  },
  {
    path:'user',
    component: ListUserComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN"] }
  },
  {
    path:'add-user',
    component: AddUserComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN"] }
  },
  {
    path:'edit-user',
    component: EditUserComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN"] }
  },
  {
    path:'login',
    component: LoginComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
