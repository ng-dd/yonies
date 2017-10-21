import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class LikesService {

  constructor(private http: Http) { }

    getLikes(like) {
      this.http.get('/likes')
      .subscribe((data) => {
        console.log(data)
      }, (err) => {
        console.log(err)
      })
    }

    addPost(like) {
      this.http.post('/likes', {
        userId: like.userId,
        postId: like.postId
      })
    }

    deleteLike(like) {
      this.http.delete(`/likes/${like.id}`)
    }
}
