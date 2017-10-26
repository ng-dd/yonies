import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment as env } from '../../environments/environment';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.css']
})
export class InstagramComponent {

  constructor( public postService: PostService) { }

  // onLoginWithInstagram() {
  //   window.location.href = `https://api.instagram.com/oauth/authorize/?client_id=${env.CLIENT_ID}&redirect_uri=${env.REDIRECT_URI}&response_type=token`
  // }

  getDavid() {
    this.postService.getInstagram('244021744', '244021744.485c416.b94164e94429496f8acee5fb4af8e790')
  }

  ngOnInit() {
    this.getDavid();
  }


}
