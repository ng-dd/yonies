import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class LikesService {

  constructor(private http: Http) { }

    getLikes(like): Observable <any> {
      console.log(like, '<<<<<<<<<<<LIKE')
      return this.http.get(`http://localhost:4201/likes/${like.uid}`)
      .map((data) => {return data.json()})
    }

    addLike(like): Observable<any> {
      console.log(like, "<<<<<<<<<<ADDLIKE")
      return this.http.post('http://localhost:4201/likes', {
        uid: like.uid,
        post_id: like.post_id,
        type: like.type
      })
      .map((res) => {return res.json()})
    }

    deleteLike(like) {
      this.http.delete(`/likes/${like.id}`)
    }
}
