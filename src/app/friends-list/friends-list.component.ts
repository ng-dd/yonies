import { Component, OnInit } from '@angular/core';
import { FriendService } from '../services/friend.service';
import { LikesService } from '../services/likes.service';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
import { Http, Response, Headers } from '@angular/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {

  friendsList: any;
  content: any;

  constructor(private sanitizer: DomSanitizer, private userService: UserService, private likeService: LikesService, private postService: PostService, private friendService: FriendService) {
    this.friendsList = [];
    this.content = [];
  }

  getFriendsList() {
    let currId = firebase.auth().currentUser.uid;    
    this.friendsList = [];
    //friend.userid should be the current session user
    this.friendService.getFriend(currId)
    .subscribe((data) => {
      data.forEach((friend) => {
        // this.friendsList.push(friend.friend_id)
        console.log(friend.friend_id)
        this.userService.getUserById(friend.friend_id)
        .subscribe((data) => {
          console.log(data, 'from get friends list');
          this.friendsList.push(data.username)
        })
      })
    })
    console.log(this.friendsList, 'friends')
  }

  visitWall(user) {
    this.content = [];
    this.userService.getUser({username: user})
    .subscribe((data) => {
      this.likeService.getLikes({uid: data[0].uid})
      .subscribe((data) => {
        data.forEach((data) => {
          this.postService.getPost({post_id: Number(data.post_id)})
          .subscribe((data) => {
            console.log({src: data[0].post_url})
            this.content.push({src: this.sanitizer.bypassSecurityTrustResourceUrl(data[0].post_url)})
          })
        })
      })
    })
  }
  
  ngOnInit() {
  }

}
