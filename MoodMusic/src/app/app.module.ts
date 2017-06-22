import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Config, IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Modules
import { IonicAudioModule, AudioProvider, audioProviderFactory } from 'ionic-audio';

import { PlayerModule } from '../pages/player/player.module';

// Pages
import { IntroPage } from '../pages/intro/intro';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { LikedGenresPage } from '../pages/liked-genres/liked-genres';
import { DislikedGenresPage } from '../pages/disliked-genres/disliked-genres';
import { HomePage } from '../pages/home/home';
import { RecentSongsPage } from '../pages/recent-songs/recent-songs';
import { SongDetailsPage } from '../pages/song-details/song-details';
import { RecentMoodsPage } from '../pages/recent-moods/recent-moods';
import { MoodDetailsPage } from '../pages/mood-details/mood-details';
import { SearchPage } from '../pages/search/search';
import { ProfilePage } from '../pages/profile/profile';
import { ChangeMyMoodPage } from '../pages/change-my-mood/change-my-mood';
import { PlayerPage } from '../pages/player/player';
import { TabsPage } from '../pages/tabs/tabs';

// Services
import { APIService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { SongService } from '../services/song.service';
import { ArtistService } from '../services/artist.service';
import { GenreService } from '../services/genre.service';
import { MoodService } from '../services/mood.service';
import { LikertService } from '../services/likert.service';

import { SearchPipe } from '../pipes/search.pipe';

import { LocalStorageService } from '../services/utils/local-storage.service';
import { VisibilityService } from '../services/utils/visibility.service';
import { MusicService } from '../services/utils/music.service';

// Utils
import { FadeTransition } from '../utils/fade-transition';

@NgModule({
  declarations: [
    MyApp,
    IntroPage,
    LoginPage,
    RegisterPage,
    LikedGenresPage,
    DislikedGenresPage,
    HomePage,
    RecentSongsPage,
    SongDetailsPage,
    RecentMoodsPage,
    MoodDetailsPage,
    SearchPage,
    SearchPipe,
    ProfilePage,
    ChangeMyMoodPage,
    PlayerPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: ''
    }),
    IonicAudioModule.forRoot({ provide: AudioProvider, useFactory: audioProviderFactory }),
    PlayerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IntroPage,
    LoginPage,
    RegisterPage,
    LikedGenresPage,
    DislikedGenresPage,
    HomePage,
    RecentSongsPage,
    SongDetailsPage,
    RecentMoodsPage,
    MoodDetailsPage,
    SearchPage,
    ProfilePage,
    ChangeMyMoodPage,
    PlayerPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    APIService,
    AuthService,
    SongService,
    ArtistService,
    GenreService,
    MoodService,
    LikertService,
    LocalStorageService,
    VisibilityService,
    MusicService,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    }
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {
  constructor(private config: Config) {
    this.config.setTransition('fade-transition', FadeTransition);
  }
}
