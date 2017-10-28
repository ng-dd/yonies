import { Component, OnInit, AfterViewInit, AfterContentChecked } from '@angular/core';
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
  selector: 'app-content-feed',
  templateUrl: './content-feed.component.html',
  styleUrls: ['./content-feed.component.css']
})
export class ContentFeedComponent implements AfterViewInit {
  
  feed: any;

  constructor(private categoryService: CategoryService, private firebaseAuth: AngularFireAuth) {
    this.feed = [];
   }

  //get current user, get content feed based on keywords of stuff they have liked,
  //so when they like, add the search query of what they liked 

  ngAfterViewInit() {
    let uid = firebase.auth().currentUser.uid;
    console.log(uid)    
    this.categoryService.getCategory(uid)
    .subscribe((data) => {
      console.log(data)
    })
  }

}
