import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { FriendsListComponent } from '../friends-list/friends-list.component';
import { ContentFeedComponent } from '../content-feed/content-feed.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { VideoShareComponent } from '../video-share/video-share.component';
import { FollowingComponent } from '../following/following.component';
import { FeaturedComponent } from '../featured/featured.component';
import { SplashComponent } from '../splash/splash.component';

const routes: Routes = [
  { path: 'home', component: SplashComponent },
  { path: 'search', component: SearchBarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'notfound', component: NotFoundComponent },
  { path: 'room', component: VideoShareComponent},
  { path: '', component: ContentFeedComponent},
  { path: 'following', component: FollowingComponent},
  { path: 'featured', component: FeaturedComponent},
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule { }
