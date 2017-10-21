import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class PostService {

  constructor(private http: Http) { }

  getPost(post) {
    this.http.get('/posts')
    .subscribe((data) => {
      console.log(data)
    }, (err) => {
      console.log(err)
    })
  }

  addPost(post) {
    this.http.post('/posts', {
      url: post.url,
      postlike: post.postLikes,
      comment: post.comment,
      commentlike: post.commentLikes,
      parent: post.parent 
    })
    .subscribe((data) => {
      console.log(data);
    }, (err) => {
      console.log(err)
    })
  }

  deletePost(post) {
    this.http.delete(`/post/${post.id}`)
  }
}
