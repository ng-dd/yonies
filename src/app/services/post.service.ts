import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Jsonp } from '@angular/http';

@Injectable()
export class PostService {

  constructor(private http: Http) { }

  createAuthorizationHeader(headers:Headers) {
    headers.append('Client-ID', 'kgr6km89embc4kfjknb072gmhkvj8u'); 
  } 
  
  getTwitch(query) {
    var headers = new Headers()
    this.createAuthorizationHeader(headers);
    this.http.get(`https://api.twitch.tv/kraken/channels/${query}/videos?limit=10`, {headers: headers})
    .subscribe((data) => {
      console.log(data.json(), 'this is the twitch data');
    }, (err) => {
      console.log('nope')
    })
  }

  getYouTube(query) {
    this.http.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=channel&chart=mostPopular&key=AIzaSyCs8PIBc9_thyv60k4mFAtlz1caOoU-aMY`)
    .subscribe((data) => {
      console.log(data.json(), 'this is the youtube data')
    })
  }

  getTwitter(query) {
    var headers = new Headers();

    this.http.get(`https://api.twitter.com/1.1/search/tweets.json?oauth_consumer_key=6CBsjafaj3F2f1AMudmMW5xSB&oauth_token=920364354737864704-puoJWNWhL4nrETA9P9rwB7W25mZ821m&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1508554105&oauth_nonce=Iihc7k&oauth_version=1.0&oauth_signature=GgZrKiVP4WR3yRW2enAkLyI6o9c%3D&q=${query}`)
    .subscribe((data) => {
      console.log(data.json(), 'this is twitter data')
    }, (err) => {
      console.log(err, 'this is the error')
    })
  }

  getPost(post) {
    this.http.get(`http://localhost:4201/posts/${post.post}`)
    .subscribe((data) => {
      console.log(data, 'this getPost from post service')
    }, (err) => {
      console.log('nah', err)
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
