import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { ContentFeedComponent } from '../content-feed/content-feed.component';
import { NotFoundComponent } from '../not-found/not-found.component';

const routes: Routes = [
  { path: 'home', component: ContentFeedComponent },
  { path: '', component: ContentFeedComponent },  
  { path: 'profile', component: ProfileViewComponent },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule { }
