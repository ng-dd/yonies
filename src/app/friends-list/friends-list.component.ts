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

import { RoomstatService } from '../services/roomstat.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {
  friendRoomList: object = [];
  friendsList: any;
  content: any;
  users: object[];
  showFriends: boolean;

  constructor(
    private sanitizer: DomSanitizer, 
    private userService: UserService, 
    private likeService: LikesService, 
    private postService: PostService, 
    private friendService: FriendService,
    private roomstatService: RoomstatService,
    private router: Router
  ) {
    this.friendsList = [];
    this.content = [];
    this.showFriends = false;
  }

  refresh() {
    window.location.reload(true);
  }

  getFriendsList() {
    this.showFriends = !this.showFriends;
    console.log(this.showFriends, 'la')
    let currId = firebase.auth().currentUser.uid;  
    console.log(currId, 'current user')  
    this.friendsList = [];
    //friend.userid should be the current session user
    this.friendService.getFriend(currId)
    .subscribe((data) => {
      data.forEach((friend) => {
        // this.friendsList.push(friend.friend_id)
        console.log('WHAT IS THIS?!?!?!?!?!?!', friend.friend_id)
        this.userService.getUserById(friend.friend_id)
        .subscribe((data) => {
          console.log(data, 'from get friends list');
          this.friendsList.push({name: data.first_name + ' ' + data.last_name, username: data.username, uid: data.uid})
          console.log(this.friendsList, 'friends')
        })
      })
    })
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
    //>>REMOVE_BEFORE_LAUNCH<< generates lists of all users- when friends work >>REMOVE_BEFORE_LAUNCH<<
    this.userService.getAllUsers()
    .subscribe((data) => {
      console.log(data);
      this.users = data;
    })
  }

  selectUser(user) {
    this.roomstatService.setRoom(String(user));
    this.router.navigate(['/room']);
  }
  

}