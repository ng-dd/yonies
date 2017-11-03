import { Component, OnInit, AfterViewInit, AfterContentChecked } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { FriendService } from '../services/friend.service';
import { PostService } from '../services/post.service';
import { HashService } from '../services/hash.service';
import { LikesService } from '../services/likes.service';
import { ScriptService } from '../services/script.service';
import { AuthService } from '../services/auth.services';
import { FollowService } from '../services/follow.service';
import { CategoryService } from '../services/category.service';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: any;
  keys: any;
  content: any;

  constructor(
    private sanitizer: DomSanitizer, 
    private http: Http,
    private postService: PostService, 
    private authService: AuthService, 
    private followService: FollowService, 
    private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private categoryService: CategoryService) { 
    
      this.categories = {
      "Cars & Vehicles": 2,
      "Comedy": 23,
      "Education": 27,
      "Entertainment": 24,
      "Film & Animation": 1,
      "Gaming": 20,
      "How-to & Style": 26,
      "Music": 10,
      "News & Politics": 25,
      "Non-profits & Activism": 29,
      "Pets & Animals": 15,
      "Science & Technology": 28,
      "Sport": 17,
      "Travel & Events": 19
    }
    this.keys = Object.keys(this.categories);
    this.content = [];
  }

  getVidsByCategory(cat) {
    this.categories = [];
    this.http.get(`https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCs8PIBc9_thyv60k4mFAtlz1caOoU-aMY&part=snippet&chart=mostpopular&videoCategoryId=${cat}`)
    .subscribe((data) => {
      console.log(data.json())
      data.json().items.forEach((video) => {
        this.content.push({date: video.snippet.publishedAt, src: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video.id)})
        console.log(this.content, 'COntent <<<<<')
      })
    })
  }
  
  ngOnInit() {
  }

}
