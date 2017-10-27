import { Component, OnInit } from '@angular/core';
import { FriendService } from '../services/friend.service';
import { LikesService } from '../services/likes.service';
import { PostService } from '../services/post.service';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {

  friendsList: any;

  constructor(private likeService: LikesService, private postService: PostService, private friendService: FriendService) {
    this.friendsList = []
  }

  getFriendsList(friend) {
    this.friendsList = [];
    //friend.userid should be the current session user
    this.friendService.getFriend(friend.user_id)
    .subscribe((data) => {
      data.forEach((friend) => {
        this.friendsList.push(friend.friend_id)
      })
    })
    console.log(this.friendsList, 'friends')
  }

  visitWall(friend) {
    console.log(friend)
    this.likeService.getLikes(friend)
  }
  
  ngOnInit() {
  }

}
