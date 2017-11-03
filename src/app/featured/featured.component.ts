import { Component, OnInit, AfterViewInit, AfterContentChecked } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { FriendService } from '../services/friend.service';
import { PostService } from '../services/post.service';
import { HashService } from '../services/hash.service';
import { LikesService } from '../services/likes.service';
import { ScriptService } from '../services/script.service';
import { AuthService } from '../services/auth.services';
import { CategoryService } from '../services/category.service';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent implements OnInit {

  content: any;
  tags: any;

  constructor(private friendService: FriendService, 
    private likeService: LikesService, 
    private sanitizer: DomSanitizer, 
    private postService: PostService, 
    private authService: AuthService, 
    private categoryService: CategoryService, 
    private afAuth: AngularFireAuth) {
      
    this.content = [];
    this.tags = [];
  }

  getTagContent(tag) {
    if (tag[0] === '#') { 
      tag = tag.slice(1);
    }
    tag = tag.split(' ').join('').toLowerCase();
    this.content = [];
    this.postService.getYouTube(tag)
    .subscribe((data) => {
      data.items.forEach((video) => {
        console.log(video, 'videos')
        this.content.push({date: video.snippet.publishedAt, src: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video.id.videoId)})
        console.log(this.content, 'CONtent *&&&&')
        // this.postService.getTwitch(tag)
        // .subscribe((data) => {
        //   data.videos.forEach((video) => {
        //     this.content.push({date: video.created_at, src: this.sanitizer.bypassSecurityTrustResourceUrl(`http://player.twitch.tv/?video=${video._id}&autoplay=false`)})
        //   })
        // })
      })
      this.content.sort((a, b) => {
        var c = new Date(a.date).getTime()
        var d = new Date(b.date).getTime()
        return c > d ? 1 : -1; 
      })
    })
    this.content = this.content.slice(0, 11);   
  }

  ngOnInit() {
    this.tags = [];
    var alpha = 'abcdefhijklmnopqrstuvwxyz'.split('');        
    this.postService.getPopularTags()
    .subscribe((data) => {
      console.log(data[0].trends);
      var trends = data[0].trends.filter((res) => {
        if (alpha.indexOf(res.name[1].toLowerCase()) !== -1) {
          return res.name;
        }
      })
      trends = trends.slice(0, 10).map((trend) => {return trend.name})
      this.tags = trends;
    })
  }

}
