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
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-content-item-wall',
  templateUrl: './content-item-wall.component.html',
  styleUrls: ['./content-item-wall.component.css']
})
export class ContentItemWallComponent implements OnInit {

  liked: boolean;
  likeCount: number;
  comments: any;
  commentForm: FormGroup;
  name: any;
  namedata: any;
  names: any;

  @Input() 
  
  vid: object;
  userId: any;
  
  constructor(
    private friendService: FriendService, 
    private likeService: LikesService, 
    private sanitizer: DomSanitizer, 
    private postService: PostService, 
    private userService: UserService,
    private authService: AuthService, 
    private categoryService: CategoryService, 
    private fb: FormBuilder, 
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute
  ) {

    this.comments = [];
    this.liked = false;
    this.likeCount = 0;
    this.commentForm = fb.group({
      'comment': null
    });
    this.names = {
      'YfvpvHVyRUfV2FGyLBhumbixxVF2': 'David',
      'JE1hS7cU3SYWB51GB9taPK2uQKc2': 'Pitbull',
      'qnIJ5lQEOhSZ7iFKLXZXftqatIk2': 'Marty'
    };  
  }

  test() {
    console.log('WHATS MY NAME', this.name)
    // console.log('LOGGED IN?', firebase.auth().currentUser)
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
    console.log(this.vid, 'vddddddd')
    if (this.liked === false) {
      this.liked = true;
      this.likeCount++;
      this.likePost(post)
    } else if (this.liked === true) {
      this.liked = false;
      this.likeCount--;
      this.deletePost(post)
      // this.decrementCounter(this.vid)
    }
  }
  
  postComment(text, id) {
    let user = firebase.auth().currentUser;
    this.postService.addComment({text: text.comment, user: user.uid, postid: id})
    .subscribe(res => {
      this.comments.push([res.text, this.name])
      console.log('RERENDERING NEW POST', this.name)
      this.likeService.addLike({uid: user.uid, post_id: res.post_id, type: 'comment'})
      .subscribe((data) => {
        // this.postService.getComments(this.vid['id'])
        // .subscribe(data => {
        //   this.comments.push([data., this.name])
        //   console.log('NEW COMMENT!!', data);
        //   console.log("MY NAME IS", this.name)
        // })
        
      })
      
    })
    
    this.commentForm.reset()
  }

  
  ngOnInit() {

    // this.name = firebase.auth().currentUser.uid;

    this.route
    .queryParams
    .subscribe(params => {
      this.userId = params.userId;
    })

    let user = firebase.auth().currentUser;
    this.userService.getUserById(user.uid)
      .subscribe(data => {
        this.name = data.first_name;
      })  

    this.likeCount = 0;
    var url = this.vid['src']['changingThisBreaksApplicationSecurity'].toString();
    this.afAuth.authState.subscribe((data) => {
      var uid = data.uid;
      this.likeService.getLikes({uid: this.userId})
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
    
    this.postService.getComments(this.vid['id'])
    .subscribe(data => {
      data.forEach((comment, index)=> {
        this.comments.push([comment.text]);
        this.postService.getUsernames(comment.post_id)
        .subscribe(data => {
          this.userService.getUserById(data.uid)
          .subscribe(data => {
            this.comments[index].push(data.first_name)
          })
        })
      })
    })
    
  } 

}

