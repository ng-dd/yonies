import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { FriendService } from '../services/friend.service';
import { PostService } from '../services/post.service';
import { HashService } from '../services/hash.service';
import { LikesService } from '../services/likes.service';
import { CategoryService } from '../services/category.service';
import { ScriptService } from '../services/script.service';
import { AuthService } from '../services/auth.services';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';
import { RoomstatService } from '../services/roomstat.service'
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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
  roomStarted: boolean = false;
  roomId: any;
  keyWord: any;
  commentOn: boolean = false;
  comments: any;
  commentForm: FormGroup;

  
  constructor(
    private scriptService: ScriptService, 
    private elementRef: ElementRef, 
    private sanitizer: DomSanitizer, 
    private postService: PostService, 
    private http: Http, 
    private hashService: HashService, 
    private userService: UserService, 
    private friendService: FriendService, 
    private fb: FormBuilder, 
    private roomstatService: RoomstatService, 
    private categoryService: CategoryService, 
    private firebaseAuth: AngularFireAuth, 
    private likeService: LikesService, 
    private router: Router,
  ) { 
    this.myForm = fb.group({
      'username': null
    })
    this.postForm = fb.group({
      'post': null
    })
    this.hashForm = fb.group({
      'hash': null
    })
    this.commentForm = fb.group({
      'comment': null
    });  
    this.commentOn = false;
    this.comments = [];

    this.tweets = [];
    this.twitch = [];
    this.youtube = [];
    this.content = [];
    this.users = [];
  }

  toggleComment() {
    if(!this.commentOn) {
      //get request to get comments on the post id
      this.postService.getComments(1)
        .subscribe(data => {
          this.comments = data;
          console.log("IS THIS COMMENTS OBJECT?>>", this.comments)
        })
      } 
      this.commentOn = !this.commentOn;
    }

  postComment(text) {
    console.log('TEXT!!!', text);
    this.postService.addComment(text);
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
      this.users.push({username: data[0].username, uid: data[0].uid})
    })
    this.myForm.reset();
  } 

  visitWall(user) {
    this.content = [];
    // console.log(user, 'user')
    this.userService.getUser(user)
    .subscribe((data) => {
      // console.log(data, '<<<<<<DATA')
      this.likeService.getLikes({uid: data[0].uid})
      .subscribe((data) => {
        // console.log("LIKE DATA!! >>>>", data)
        data.forEach((data) => {
          this.postService.getPost({post_id: data.post_id})
          .subscribe((data) => {
            // console.log('HERE IS SOURCE!!', {src: data.text})
            this.content.push({src: this.sanitizer.bypassSecurityTrustResourceUrl(data.text)})
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

  addFriend(user) {
    let currId = firebase.auth().currentUser.uid;
    console.log(currId, user.uid)
    this.friendService.addFriend(currId, user.uid)
  }
  // addFriend(query) {
  //   this.friendService.addFriend(11, String(query))
  // }
  
  follow(person) {
    let uid = firebase.auth().currentUser.uid;
    console.log(person, uid)
    this.categoryService.addCategory({name: person, uid: uid})     
  }

  searchPosts(query) {
    this.keyWord = '';
    this.keyWord = query.post;
    this.tweets = [];
    this.twitch = [];
    this.youtube = [];
    this.content = [];
    query.post = query.post.split(' ').join('');
    // console.log(query, 'this is from searchbar')
    this.postService.getYouTube(query.post)
    .subscribe((data) => {
      data.items.forEach((video) => {
        this.content.push({date: video.snippet.publishedAt, src: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video.id.videoId)})
      })
      this.content.sort((a, b) => {
        var c = new Date(a.date).getTime()
        var d = new Date(b.date).getTime()
        return c > d ? 1 : -1; 
      })  
      this.postService.getTwitch(query.post)
      .subscribe((data) => {
        data.videos.forEach((video) => {
          this.content.push({date: video.created_at, src: this.sanitizer.bypassSecurityTrustResourceUrl(`http://player.twitch.tv/?video=${video._id}&autoplay=false`)})
        })
        console.log(this.content, '<<<<<<< CONTENT BY DATES')
        this.content.sort((a, b) => {
          var c = new Date(a.date).getTime()
          var d = new Date(b.date).getTime()
          return c > d ? 1 : -1; 
        })   
      })
      // console.log(this.youtube, 'YOUTUBE <<<<<<<<')
    })

    this.postService.getTwitter(query.post)
    .subscribe((data) => {
      for (var i = 0; i < data.length; i++) {
        this.postService.getEmbed(data[i])
        .subscribe((data) => {
          // console.log(data, 'TWITTER OMBED DATA <<<<<<<<<<<<<')
          var el = document.createElement('html');
          el.innerHTML = data;
          console.log(el, 'TWITTER <<<<<<<<<<<<') 
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

    //testing embed timeline
    // this.postService.getEmbed(query.post)
    // .subscribe((data) => {
    //   console.log(data, 'twitter oembed data')
    //   var el = document.createElement('html');
    //   el.innerHTML = data;
    //   var twt = this.sanitizer.bypassSecurityTrustHtml(el.innerHTML);             
    //   this.tweets.push(twt);
    //   this.scriptService.load('twitterWidget')
    //     .then(data => {
    //       console.log('script loaded ', data);
    //     })
    //     .catch(error => console.log(error)); 
    // })
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
    console.log(post, '<<<<<KERSHAW!!!')  
    this.postService.addPost(post)
    .subscribe((res) => {
      console.log(res, '<<<<<< RES')
      this.likeService.addLike({uid: user.uid, post_id: String(res.post_id), type: 'post'})
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

    this.roomstatService.addRoomstat((roomData)=>{
      let response = JSON.parse(roomData._body)
      this.roomId = response.room_id;
      this.roomStarted = true;
    })
    let url  = vid.src['changingThisBreaksApplicationSecurity']
    if (url.indexOf('youtube') >= 0){
      this.videoUrl = url.slice(url.indexOf('embed')+ 6, url.length)
    } else {
      this.videoUrl = url;
    }
    this.roomstatService.selectVideo(this.videoUrl)
    this.router.navigate(['/room'])
  }

  connectToRoom(roomId){
    console.log('room', this.roomId)

  } 

  ngOnInit() {
  }
}