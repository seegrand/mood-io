import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IntroPage } from '../pages/intro/intro';
import { TabsPage } from '../pages/tabs/tabs';
// import { HomePage } from '../pages/home/home';

import { AuthService } from '../services/auth.service';

import { LocalStorageService } from '../services/utils/local-storage.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private authService: AuthService,
    private localStorageService: LocalStorageService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      var userToken = this.localStorageService.getUserToken();

      if (userToken) {
        this.authService.refreshToken(userToken).subscribe((res) => {
          console.log(res);

          if (res.ok) {
            this.rootPage = TabsPage;
          } else {
            this.rootPage = IntroPage;
          }
        });
      } else {
        this.rootPage = IntroPage;
      }

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
