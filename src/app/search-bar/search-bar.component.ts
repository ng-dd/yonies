import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { FriendService } from '../services/friend.service';
import { PostService } from '../services/post.service';
import { HashService } from '../services/hash.service';
import { LikesService } from '../services/likes.service';
import { ScriptService } from '../services/script.service';
import { AuthService } from '../services/auth.services';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {

  myForm: FormGroup;
  username: string = '';
  postForm: FormGroup;
  hashForm: FormGroup;
  hashButton: boolean = false;
  postButton: boolean = false;
  userButton: boolean = false;
  tweets: any;
  twitch: any;
  youtube: any;
  content: any;
  videoUrl: string;
  users: any;

  constructor(private friendService: FriendService, private firebaseAuth: AngularFireAuth, private likeService: LikesService, private scriptService: ScriptService, private elementRef: ElementRef, private sanitizer: DomSanitizer, private postService: PostService, private http: Http, private hashService: HashService, private userService: UserService, private fb: FormBuilder) { 
    this.myForm = fb.group({
      'username': null
    })
    this.postForm = fb.group({
      'post': null
    })
    this.hashForm = fb.group({
      'hash': null
    })

    this.tweets = [];
    this.twitch = [];
    this.youtube = [];
    this.content = [];
    this.users = [];
  }



  toggleQuery(value: any) {
    if (value === 'Hashes') {
      this.postButton = false;
      this.userButton = false;
      this.hashButton = true;
    } 
    if (value === 'Posts') {
      this.postButton = true;
      this.userButton = false;
      this.hashButton = false;      
    }
    if (value === 'People') {
      this.postButton = false;
      this.userButton = true;
      this.hashButton = false; 
    }
  }

  searchUsers(query) {
    console.log(query)
    this.users = [];
    this.userService.getUser(query)
    .subscribe((data) => {
      console.log(data, 'users data')
      this.users.push(data[0].username)
    })
    this.myForm.reset();
  } 

  visitWall(user) {
    this.content = [];
    this.userService.getUser({username: user})
    .subscribe((data) => {
      this.likeService.getLikes({user_id: data[0].user_id})
      .subscribe((data) => {
        console.log(data)
        data.forEach((data) => {
          this.postService.getPost({post: Number(data.post_id)})
          .subscribe((data) => {
            console.log({src: data[0].post_url})
            this.content.push({src: this.sanitizer.bypassSecurityTrustResourceUrl(data[0].post_url)})
          })
        })
      })
    })
  }

  searchHashTags(query) {
    console.log(query)
    this.hashService.getHash(query)
    this.hashForm.reset();
  }

  addFriend(query) {
    this.friendService.addFriend('11', query)
  }
  
  searchPosts(query) {
    this.tweets = [];
    this.twitch = [];
    this.youtube = [];
    this.content = [];
    // console.log(query, 'this is from searchbar')
    this.postService.getTwitch(query.post)
    .subscribe((data) => {
      data.videos.forEach((video) => {
        this.twitch.push(this.sanitizer.bypassSecurityTrustResourceUrl(`http://player.twitch.tv/?video=${video._id}&autoplay=false`));
        this.content.push({date: video.created_at, src: this.sanitizer.bypassSecurityTrustResourceUrl(`http://player.twitch.tv/?video=${video._id}&autoplay=false`)})
      })
      this.postService.getYouTube(query.post)
      .subscribe((data) => {
        data.items.forEach((video) => {
          // var link = this.sanitizer.bypassSecurityTrustUrl('https://www.youtube.com/embed/' + video.id.videoId)
          this.youtube.push(this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video.id.videoId))
          this.content.push({date: video.snippet.publishedAt, src: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video.id.videoId)})
        })
        // console.log(this.youtube, 'YOUTUBE <<<<<<<<')
        this.content.sort((a, b) => {
          var c = new Date(a.date).getTime()
          var d = new Date(b.date).getTime()
          return c > d ? 1 : -1; 
        })   
    })

      console.log(this.content, '<<<<<<< CONTENT BY DATES')
    })

    this.postService.getTwitter(query.post)
    .subscribe((data) => {
      for (var i = 0; i < data.length; i++) {
        this.postService.getEmbed(data[i])
        .subscribe((data) => {
          // console.log(data, 'TWITTER OMBED DATA <<<<<<<<<<<<<')
          var el = document.createElement('html');
          el.innerHTML = data;
          // console.log(el, 'TWITTER <<<<<<<<<<<<') 
          var twt = this.sanitizer.bypassSecurityTrustHtml(el.innerHTML);          
          this.tweets.push(twt);
          this.scriptService.load('twitterWidget')
          .then(data => {
            console.log('script loaded ', data);
          })
          .catch(error => console.log(error));    
        })
      }
    }, (err) => {
      console.log(err, 'error from searchPosts')
    })
    this.postForm.reset();
  }
  
  auth() {
    this.http.get('http://localhost:4201/auth')
    .subscribe((data) => {
      console.log(data)
      for (var key in data) {
        if (typeof data[key] === 'string') {
          if (data[key].length > 50) {
            console.log(JSON.parse(data[key]).data)
            localStorage.setItem('bearerToken', JSON.parse(data[key]).data)
          }
        }
      }
    }, (err) => {
      console.log(err)
    })
  }

  //add the post to the post table and the likes table
  likePost(post) {
    let user = firebase.auth().currentUser;    
    this.postService.addPost(post)
    .subscribe((res) => {
      console.log(res.id, '<<<<<< RES')
      this.likeService.addLike({user_id: user.uid, post_id: String(res.id)})
      .subscribe((data) => {
        console.log(data, '<<<< LIKESERVICE ADD LIKE DATA')
      })
    })  
  }

  //daniel, remember to delete this
  currentUser() {
    let user = firebase.auth().currentUser;
    console.log(user)
  }


  roomStart(vid) {
    console.log(vid.src['changingThisBreaksApplicationSecurity']);
    let url  = vid.src['changingThisBreaksApplicationSecurity']
    if (url.indexOf('youtube') >= 0){
      this.videoUrl = url.slice(url.indexOf('embed')+ 6, url.length)
      console.log(this.videoUrl)
    } else {
      this.videoUrl = url;
    }
  }
  
  ngOnInit() {
  }
}
