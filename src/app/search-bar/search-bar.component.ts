import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { PostService } from '../services/post.service';
import { HashService } from '../services/hash.service';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpModule }  from '@angular/http';

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
  tweets: Object;

  constructor(private postService: PostService, private http: Http, private hashService: HashService, private userService: UserService, private fb: FormBuilder) { 
    this.myForm = fb.group({
      'username': null
    })
    this.postForm = fb.group({
      'post': null
    })
    this.hashForm = fb.group({
      'hash': null
    })
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
    this.userService.getUser(query)
    this.myForm.reset();
  } 

  searchHashTags(query) {
    console.log(query)
    this.hashService.getHash(query)
    this.hashForm.reset();
  }

  searchPosts(query) {
    console.log(query)
    this.postService.getTwitch(query.post)
    // this.postService.getYouTube(query.post)
    // this.postService.getTwitter(query.post)
    // .subscribe((data) => {
    //   console.log(data, 'this s in the search bar componebt')
    //   // this.tweets = data.html;
    //   // console.log(this.tweets, 'this is the tweets')
    // }, (err) => {
    //   console.log(err)
    // })
    this.postForm.reset();
  }
  //toggle between search bars
  //one search bar to search for users

  //one search bar to search for hashtags

  //one search bar to search for posts

  ngOnInit() {
  }
}
