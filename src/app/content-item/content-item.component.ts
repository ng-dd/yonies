import { Component, OnInit, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { FriendService } from '../services/friend.service';
import { PostService } from '../services/post.service';
import { HashService } from '../services/hash.service';
import { LikesService } from '../services/likes.service';
import { ScriptService } from '../services/script.service';
import { AuthService } from '../services/auth.services';
import { CategoryService } from '../services/category.service';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-content-item',
  templateUrl: './content-item.component.html',
  styleUrls: ['./content-item.component.css']
})
export class ContentItemComponent implements OnInit {

  content: any;
  liked: boolean;
  likeCount: number;

  @Input() 
  
  vid: object;
  
  constructor(
    private friendService: FriendService, 
    private likeService: LikesService, 
    private sanitizer: DomSanitizer, 
    private postService: PostService, 
    private authService: AuthService, 
    private categoryService: CategoryService, 
    private afAuth: AngularFireAuth
  ) {
    this.content = [];
    this.liked = false;
    this.likeCount = 0;
  }

  likePost(post) {
    let user = firebase.auth().currentUser;    
    this.postService.addPost(post)
    .subscribe((res) => {
      console.log(res, '<<<<<< RES')
      this.likeService.addLike({uid: user.uid, post_id: String(res.post_id), type: 'post'})
      .subscribe((data) => {
        console.log(data, '<<<< LIKESERVICE ADD LIKE DATA')
      })
    }) 
    this.liked = true; 
  }

  deletePost(post) {
    let user = firebase.auth().currentUser;
    this.likeService.getLikes({uid: user.uid})
    .subscribe((data) => {
      var ids = data.map((item) => {return item.post_id});
      ids.forEach((id) => {
        this.postService.getPost({post_id: id})
        .subscribe((data) => {
          if (data.text === post.url) {
            this.postService.deletePost({id: data.post_id})
          }
        })
      })
    })
  }

  decrementCounter(post) {
    this.postService.decrementLikeCount(post.id);
  }

  toggleLiked(post) {
    console.log(this.vid, 'psssttt')
    if (this.liked === false) {
      this.liked = true;
      this.likeCount++;
      this.likePost(post)
    } else if (this.liked === true) {
      this.liked = false;
      this.likeCount--;
      this.deletePost(post)
    }
  }

  ngOnInit() {
    this.likeCount = 0;
    var url = this.vid['src']['changingThisBreaksApplicationSecurity'].toString();
    this.afAuth.authState.subscribe((data) => {
      var uid = data.uid;
      this.likeService.getLikes({uid: uid})
      .subscribe((data) => {
        var postIds = data.map((post) => {return post.post_id});
        postIds.forEach((id) => {
          this.postService.getPost({post_id: id})
          .subscribe((data) => {
            if (data.text === url) {
              this.likeCount = data.like_count;
              this.liked = true;
            }
          })
        })
      })
    })
  }

  // roomStart() {
  //   console.log(this.vid['src']);
  //   let url  = this.vid['src']
  //   if (url.indexOf('youtube') >= 0){
  //     this.videoUrl = url.slice(url.indexOf('embed')+ 6, url.length)
  //   } else {
  //     this.videoUrl = url;
  //   }
  //   this.roomstatService.addRoomstat({
  //     host_id: this.afAuth.auth.currentUser.uid,
  //     video_url: this.videoUrl
  //   })
  //   .subscribe((roomData)=> {
  //     let response = roomData
  //     this.roomId = response.room_id;
  //     this.roomStarted = true;
  //     console.log('video url', this.videoUrl)
  //     this.roomstatService.selectVideo(this.videoUrl)
  //     this.router.navigate(['/room'])
  //   })
  // }

}