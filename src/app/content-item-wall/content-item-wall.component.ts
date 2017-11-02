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
  selector: 'app-content-item-wall',
  templateUrl: './content-item-wall.component.html',
  styleUrls: ['./content-item-wall.component.css']
})
export class ContentItemWallComponent implements OnInit {

  content: any;
  liked: boolean;
  likeCount: number;
  commentOn: boolean = false;
  comments: any;
  commentForm: FormGroup;

  @Input() 
  
  vid: object;
  
  constructor(
    private friendService: FriendService, 
    private likeService: LikesService, 
    private sanitizer: DomSanitizer, 
    private postService: PostService, 
    private authService: AuthService, 
    private categoryService: CategoryService, 
    private fb: FormBuilder, 
    private afAuth: AngularFireAuth) {

    this.content = [];
    this.liked = false;
    this.likeCount = 0;
    this.commentForm = fb.group({
      'comment': null
    });  
    this.commentOn = false;
  }

  likePost(post) {
    let user = firebase.auth().currentUser;    
    this.postService.addPost(post)
    .subscribe((res) => {
      console.log(res, '<<<<<< RES')
      this.likeService.addLike({uid: user.uid, post_id: String(res.post_id)})
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


  toggleLiked(post) {
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

  toggleComment(id) {
    this.comments = [];
    if(!this.commentOn) {
      //get request to get comments on the post id
      this.postService.getComments(id)
        .subscribe(data => {
          this.comments = data;
          console.log("IS THIS COMMENTS OBJECT?>>", this.comments)
        })
      } 
      this.commentOn = !this.commentOn;
    }

  postComment(text, id) {
    console.log('THIS IS THE ID!!!', id);
    this.postService.addComment(text, id)
      .subscribe(res => {
        console.log(res);
      })
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

}