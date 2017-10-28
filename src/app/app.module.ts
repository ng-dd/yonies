import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }  from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Design modules Material Design and Flex layout modules, hammerjs for gestures
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

import { AppComponent } from './app.component';
import { ContentItemComponent } from './content-item/content-item.component';
import { ContentFeedComponent } from './content-feed/content-feed.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { SearchComponent } from './search/search.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { StreamViewComponent } from './stream-view/stream-view.component';
import { StreamChatLogComponent } from './stream-chat-log/stream-chat-log.component';
import { SingleCelebFeedComponent } from './single-celeb-feed/single-celeb-feed.component';

// import { Peer } from 'simple-peer'; //webrtc 

//firebase modules
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from '../environments/firebase.config';
// import * as YT from 'youtube';

//services
import { UserService } from './services/user.service';
import { PostService } from './services/post.service';
import { LikesService } from './services/likes.service';
import { MessageService } from './services/message.service';
import { FriendService } from './services/friend.service';
import { CategoryService } from './services/category.service';
import { RoomstatService } from './services/roomstat.service';
import { AuthService } from './services/auth.services';
import { ScriptService } from './services/script.service';
import { HashService } from './services/hash.service'
import { TestingComponent } from './testing/testing.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentItemComponent,
    ContentFeedComponent,
    ProfileViewComponent,
    UserSettingsComponent,
    SearchComponent,
    NavbarComponent,
    FriendsListComponent,
    SearchBarComponent,
    NotificationsComponent,
    StreamViewComponent,
    StreamChatLogComponent,
    SingleCelebFeedComponent,
    TestingComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,  
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(firebaseConfig), // imports firebase/app needed for everything
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  providers: [
    AuthService,
    UserService,
    PostService,
    LikesService,
    MessageService,
    FriendService,
    CategoryService,
    RoomstatService,
    HashService,
    ScriptService,
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
