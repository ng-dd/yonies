import { Component, OnInit, AfterViewInit, AfterContentChecked } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { FriendService } from '../services/friend.service';
import { PostService } from '../services/post.service';
import { HashService } from '../services/hash.service';
import { LikesService } from '../services/likes.service';
import { FollowService } from '../services/follow.service';
import { ScriptService } from '../services/script.service';
import { AuthService } from '../services/auth.services';
import { CategoryService } from '../services/category.service';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';
import { RoomstatService } from '../services/roomstat.service'
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
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
  name: string; 
  categories: any;
  keys: any;
  tags: any;

  
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
    private followService: FollowService,
    private categoryService: CategoryService, 
    private afAuth: AngularFireAuth, 
    private likeService: LikesService, 
    private router: Router,
    private authService: AuthService, 
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
    this.categories = {
      "🚗": 2,
      "😂": 23,
      "🏫": 27,
      "🎭": 24,
      "🎥": 1,
      "🎮": 20,
      "👗": 26,
      "🎵": 10,
      "🌎": 25,
      "❤️": 29,
      "🐶": 15,
      "📱": 28,
      "🏈": 17,
      "✈️": 19
    }
    this.keys = Object.keys(this.categories);

    this.tweets = [];
    this.twitch = [];
    this.youtube = [];
    this.content = [];
    this.users = [];
    this.name = "";
    this.tags = [];
  }

  currentUser() {
    let user = firebase.auth().currentUser;
    console.log(user)
  }

  getVidsByCategory(cat) {
    this.content = [];
    this.http.get(`https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCs8PIBc9_thyv60k4mFAtlz1caOoU-aMY&part=snippet&chart=mostpopular&videoCategoryId=${cat}`)
    .subscribe((data) => {
      console.log(data.json())
      data.json().items.forEach((video) => {
        this.content.push({date: video.snippet.publishedAt, src: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video.id)})
        console.log(this.content, 'COntent <<<<<')
      })
    })
  }

  getTagContent(tag) {
    if (tag[0] === '#') {
      tag = tag.slice(1);
    }
    tag = tag.split(' ').join('').toLowerCase();
    this.content = [];
    this.postService.getYouTube(tag)
    .subscribe((data) => {
      data.items.forEach((video) => {
        console.log(video, 'videos')
        this.content.push({date: video.snippet.publishedAt, src: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video.id.videoId)})
        console.log(this.content, 'CONtent *&&&&')
        // this.postService.getTwitch(tag)
        // .subscribe((data) => {
        //   data.videos.forEach((video) => {
        //     this.content.push({date: video.created_at, src: this.sanitizer.bypassSecurityTrustResourceUrl(`http://player.twitch.tv/?video=${video._id}&autoplay=false`)})
        //   })
        // })
      })
      this.content.sort((a, b) => {
        var c = new Date(a.date).getTime()
        var d = new Date(b.date).getTime()
        return c > d ? 1 : -1; 
      })
    })
    this.content = this.content.slice(0, 11);  
    window.scrollTo(0, 1000);
    // this.content.scrollIntoView();
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
    this.userService.getUsersByName(query)
    .subscribe(data => {
      console.log(data, 'users data')
      data.forEach(person => {
        this.users.push({firstname: person.first_name, username: person.username, uid: person.uid})
      })
    })
    this.myForm.reset();
  } 

  visitWall(user) {
    console.log(user, 'THIS IS THE USER BRUH!!')
        this.content = [];
    // console.log(user, 'user')
    this.userService.getUser(user)
    .subscribe((data) => {
      console.log(data, '<<<<<<DATA')
      this.likeService.getLikes({uid: data[0].uid})
      .subscribe((data) => {
        console.log("LIKE DATA!! >>>>", data)
        data.forEach((data) => {
          this.postService.getPost({post_id: data.post_id})
          .subscribe((data) => {
            // console.log('HERE IS SOURCE!!', {src: data.text})
            this.content.push({src: this.sanitizer.bypassSecurityTrustResourceUrl(data.text), id: data.post_id})
          })
        })
      })
    })
  }

  searchHashTags(query) {
    console.log(query)
    this.searchPosts({post: query.hash});
    this.hashForm.reset();
  }

  addFriend(user) {
    let currId = firebase.auth().currentUser.uid;
    console.log(currId, user.uid)
    this.friendService.addFriend(currId, user.uid);
    this.friendService.addFriend(user.uid, currId);
  }
  
  follow(person) {
    let uid = firebase.auth().currentUser.uid;
    console.log(person, uid)
    this.categoryService.addCategory(person)
      .subscribe(res => {
        console.log('HERE IS THE CATEGORY INFO', res)
        this.followService.addFollow({
          category_id: res.category_id,
          uid: uid
        })
      })

    // this.followService.addFollow({name: person, uid: uid})     
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
      this.postService.getVideosForGame(query.post)
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
    this.postService.addPost(post)
    .subscribe((res) => {
      this.likeService.addLike({uid: user.uid, post_id: String(res.post_id), type: 'post'})
      .subscribe((data) => {
      })
    })  
  }

  roomStart(vid) {
    console.log(vid.src['changingThisBreaksApplicationSecurity']);
    let url  = vid.src['changingThisBreaksApplicationSecurity']
    if (url.indexOf('youtube') >= 0){
      this.videoUrl = url.slice(url.indexOf('embed')+ 6, url.length)
    } else {
      this.videoUrl = url;
    }
    this.roomstatService.addRoomstat({
      host_id: this.afAuth.auth.currentUser.uid,
      video_url: this.videoUrl
    })
    .subscribe((roomData)=> {
      let response = roomData
      this.roomId = response.room_id;
      this.roomStarted = true;
      console.log('video url', this.videoUrl)
      this.roomstatService.selectVideo(this.videoUrl)
      this.router.navigate(['/room'])
    })
  }

  connectToRoom(roomId){
    console.log('room', this.roomId)
  } 

  login1(){
    this.afAuth.auth.signInWithEmailAndPassword('test@tester.com', 'testerosa')
    .then(()=>{
      console.log('login to test testerson successful')
    })
  }

  login2(){
    this.afAuth.auth.signInWithEmailAndPassword('mrworldwide@pitbull.com', 'plantlife')
    .then(()=>{
      console.log('login to mrworldwide successful')
    })
  }

  deleteUsers() {
    console.log('deleting users...')
    this.userService.deleteAllUsers()
  }


  //remove later
  getContent(){
    this.postService.getVideosForGame('Overwatch')
    .subscribe((data) => {
      console.log(data)
    })
  }


  ngOnInit() { 
    this.tags = [];
    var alpha = 'abcdefhijklmnopqrstuvwxyz'.split('');        
    this.postService.getPopularTags()
    .subscribe((data) => {
      console.log(data[0].trends);
      var trends = data[0].trends.filter((res) => {
        if (alpha.indexOf(res.name[1].toLowerCase()) !== -1) {
          return res.name;
        }
      })
      trends = trends.slice(0, 10).map((trend) => {return trend.name})
      this.tags = trends;
    })
  }
  scrollTop() {
    window.scrollTo(300, 0);
  }
}