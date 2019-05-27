import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Category } from './models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl = environment.apiUrl;

  // inject the HttpClient as http so we can use it in this class
  constructor(private http: HttpClient) {}

  // return what comes back from this http call
  getCategories() {
    return this.http.get(`${this.apiUrl}/category`);
  }

  getCategory(categoryId){
    return this.http.get(`${this.apiUrl}/category/${categoryId}`);
  }

  addCategory(data) {
    return this.http.post(`${this.apiUrl}/category`, data);
  }

  editCategory(data){
    return this.http.put(`${this.apiUrl}/category/${data.id}`, data);
  }

  deleteCategory(CategoryId){
    return this.http.delete(`${this.apiUrl}/category/${CategoryId}`);
  }
}
