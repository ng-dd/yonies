import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    // console.log('hi')
    // console.log(this.userService.addUser({username: "someone"}))
  }

}
