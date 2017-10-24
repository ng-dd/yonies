import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { TwitterService } from 'ng2-twitter';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class PostService {

  constructor(private http: Http, private twitter: TwitterService) { }

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

  // getTwitter(query: string): Observable<any> {
  //   return this.http.get(`http://localhost:4201/tweets/${query}`)
  //   .map((res) => {return res.json()})
  // }

  getTwitter(query) {
    // return this.twitter.get(`https://api.twitter.com/1.1/search/tweets.json?q=${query}`,
    // {
    //   count: 5
    // },
    // {
    //   consumerKey: '6CBsjafaj3F2f1AMudmMW5xSB',
    //   consumerSecret: 'BlZMYXZz3VsbObqi8tnDhT36UAxfdMqI2aTnRRBTUdBUeihIjj'
    // },
    // {
    //   token: '920364354737864704-puoJWNWhL4nrETA9P9rwB7W25mZ821m',
    //   tokenSecret: 'WaQV14WDuDOTYiL8o9qC5JmuwfW1woxkxApDGfdgYHems'
    // })
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
