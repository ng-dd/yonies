import { Component, OnInit } from '@angular/core';
import { FriendService } from '../services/friend.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {

  friendsList: any;

  constructor(private friendService: FriendService) {
    this.friendsList = []
  }

  getFriendsList(friend) {
    this.friendsList = [];
    //friend.userid should be the current session user
    this.friendService.getFriend(friend.userId)
    .subscribe((data) => {
      data.forEach((friend) => {
        this.friendsList.push(friend.friend_id)
      })
    })
    console.log(this.friendsList, 'friends')
  }
  
  ngOnInit() {
  }

}
