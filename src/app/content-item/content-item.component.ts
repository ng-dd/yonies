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
  template: `
  <div>
    <iframe
      [src]='vid.src'
      height='315'
    width='420'>
  </iframe>
  </div>
  <i *ngIf="!this.liked" class="material-icons" (click)="toggleLiked({url: vid.src.changingThisBreaksApplicationSecurity.toString()})">favorite_border</i>
  <i *ngIf="this.liked" class="material-icons" (click)="toggleLiked()">favorite</i>
  `,
  styleUrls: ['./content-item.component.css']
})
export class ContentItemComponent implements OnInit {

  content: any;
  liked: boolean;

  @Input() 
  
  vid: object;
  
  constructor(private friendService: FriendService, private likeService: LikesService, private sanitizer: DomSanitizer, private postService: PostService, private authService: AuthService, private categoryService: CategoryService, private afAuth: AngularFireAuth) {
    this.content = [];
    this.liked = false;
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


  toggleLiked(post) {
    if (this.liked === false) {
      this.liked = true;
      this.likePost(post)
    } else if (this.liked === true) {
      this.liked = false;
    }
  }

  ngOnInit() {
    console.log(this.vid, 'loggin vid <<<<@@@##$$')
  }

}
