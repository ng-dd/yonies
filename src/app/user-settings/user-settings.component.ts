import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../shared/user';
// import db from '../../../server/db/index.js'

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent {

  user: any[] = null;
  
  constructor(public userService: UserService) { 
    this.user = [];
  }

  searchUsers(): void {
    // this.userService.getUserTest('jonjones')
    //   .subscribe((data) => {
    //     this.user = data;
    //     console.log('test', this.user);
    //     // console.log('this is user', JSON.parse(this.user));
    //   })
    // console.log('what is this', this.userService.getUser('jonjones'));
    // this.userService.getUserTest('jonjones')
    // .subscribe(res => { 
    //   this.user = res.json()[0];
    //   console.log('USER!', this.user);
    // })

      
  } 

  ngOnInit() {
    this.searchUsers();
  }

  

}
