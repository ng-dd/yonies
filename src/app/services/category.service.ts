import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class CategoryService {

  constructor(private http: Http) { }

  getCategory(category) {
    this.http.get('/categories')
    .subscribe((data) => {
      console.log(data)
    }, (err) => {
      console.log(err)
    })
  }

  addCategory(category) {
    this.http.post('/category', {
      name: category.name
    })
    .subscribe((data) => {
      console.log('added category', data)
    }, (err) => {
      console.log(err)
    })
  }

  deleteCategory(category) {
    this.http.delete(`/categories/${category.id}`)
  }
}
