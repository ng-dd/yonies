import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment as env } from '../../environments/environment';
import { PostService } from '../services/post.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.css']
})
export class InstagramComponent {

  instagram: any;

  constructor( public postService: PostService) { }

  // onLoginWithInstagram() {
  //   window.location.href = `https://api.instagram.com/oauth/authorize/?client_id=${env.CLIENT_ID}&redirect_uri=${env.REDIRECT_URI}&response_type=token`
  // }

  getDavid() {
    // this.postService.getInstagram('244021744', '244021744.485c416.b94164e94429496f8acee5fb4af8e790')
    console.log('testing david works');
  }

  searchInsta(query) {
    this.postService.getInstagram();
  }

  searchDavid() {
    console.log('searching')
    this.postService.getInstagram()
    .subscribe((data) => {
      console.log(JSON.parse(data._body).data[0].images.standard_resolution.url, 'component<<<<<<<<,')
      this.instagram = JSON.parse(data._body).data[0].images.standard_resolution.url;
    }, (err) => {
      console.log(err, 'insta component error')
    })
  }

  ngOnInit() {
    // this.getDavid();
  }


}
