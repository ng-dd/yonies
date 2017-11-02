import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class CategoryService {

  constructor(private http: Http) { }

  getCategoryById(id): Observable <any> {
    return this.http.get(`http://localhost:4201/categoryid/${id}`)
    .map((data) => {
      return data.json();
    })
  }

  getCategory(person): Observable <any> {
    return this.http.get(`http://localhost:4201/categories/${person}`)
    .map((data) => {
      return data.json();
    })
  } 

  addCategory(person): Observable <any>  {
    return this.http.post('http://localhost:4201/categories', {
      name: person
    })
    .map((data) => {
      return data.json();
    })
  }

  deleteCategory(category) {
    this.http.delete(`/categories/${category.id}`)
  }
}