import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class LikesService {

  constructor(private http: Http) { }

    getLikes(like) {
      this.http.get(`http://localhost:4201/likes/${like.user_id}`)
      .subscribe((data) => {
        console.log(data)
      }, (err) => {
        console.log(err)
      })
    }

    addLike(like): Observable<any> {
      console.log(like, "<<<<<<<<<<ADDLIKE")
      return this.http.post('http://localhost:4201/likes', {
        user_id: like.user_id,
        post_id: like.post_id
      })
      .map((res) => {return res.json()})
    }

    deleteLike(like) {
      this.http.delete(`/likes/${like.id}`)
    }
}
