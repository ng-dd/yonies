import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class CategoryService {

  constructor(private http: Http) { }

  getCategory(category): Observable <any> {
    return this.http.get(`http://locahost:4201/categories/${category.uid}`)
    .map((data) => {
      return data.json();
    })
  }

  addCategory(category) {
    this.http.post('http://localhost:4201/categories', {
      name: category.name,
      uid: category.uid
    })
    .subscribe((data) => {
      console.log(data, 'category data')
    })
  }

  deleteCategory(category) {
    this.http.delete(`/categories/${category.id}`)
  }
}