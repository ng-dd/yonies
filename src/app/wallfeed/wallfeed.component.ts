import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
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
import { RoomstatService } from '../services/roomstat.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-wallfeed',
  templateUrl: './wallfeed.component.html',
  styleUrls: ['./wallfeed.component.css']
})


export class WallfeedComponent implements OnInit {


  content: any;

  @Input()

  userId: any;

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
    private firebaseAuth: AngularFireAuth, 
    private likeService: LikesService, 
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.content = [];
    this.userId = "";
  }

  test() {
    console.log(this.userId, "USER ID??");
  }
 
  ngOnInit() {
    this.route
    .queryParams
    .subscribe(params => {
      this.userId = params.userId;
    })

    this.userService.getUserById(this.userId)
    .subscribe((data) => {
      console.log(data, '<<<<<<DATA')
      this.likeService.getLikes({uid: data.uid})
      .subscribe((data) => {
        console.log("LIKE DATA!! >>>>", data)
        data.forEach((data) => {
          this.postService.getPost({post_id: data.post_id})
          .subscribe((data) => {
            console.log(data.text, 'SRC URL %%%%%%%%%%')
            // console.log('HERE IS SOURCE!!', {src: data.text})
            this.content.push({src: this.sanitizer.bypassSecurityTrustResourceUrl(data.text), id: data.post_id})
            console.log(this.content, 'CONTENT ************')
          })
        })
      })
    })
  }


  // visitWall(user) {
  //   this.content = [];
  //   // console.log(user, 'user')
  //   this.userService.getUser(user)
  //   .subscribe((data) => {
  //     console.log(data, '<<<<<<DATA')
  //     this.likeService.getLikes({uid: data[0].uid})
  //     .subscribe((data) => {
  //       console.log("LIKE DATA!! >>>>", data)
  //       data.forEach((data) => {
  //         this.postService.getPost({post_id: data.post_id})
  //         .subscribe((data) => {
  //           // console.log('HERE IS SOURCE!!', {src: data.text})
  //           this.content.push({src: this.sanitizer.bypassSecurityTrustResourceUrl(data.text), id: data.post_id})
  //         })
  //       })
  //     })
  //   })
  // }
}
