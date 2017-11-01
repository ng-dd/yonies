import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ContentFeedComponent } from '../content-feed/content-feed.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { VideoShareComponent } from '../video-share/video-share.component';

const routes: Routes = [
  { path: 'home', component: ContentFeedComponent },
  { path: 'search', component: SearchBarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'notfound', component: NotFoundComponent },
  { path: 'room', component: VideoShareComponent},
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule { }
