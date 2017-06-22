import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import { AuthService } from '../../services/auth.service';
import { LikertService } from '../../services/likert.service';

import { VisibilityService } from '../../services/utils/visibility.service';
import { LocalStorageService } from '../../services/utils/local-storage.service';

import { Mood } from '../../model/mood';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  validationPattern: RegExp = /^[a-zA-Z0-9_-]*$/;

  data: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private authService: AuthService,
    private likertService: LikertService,
    private visibilityService: VisibilityService,
    private localStorageService: LocalStorageService) {}

  login() {
    var loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Logging in...'
    });

    loading.present().then(() => {

      this.authService.login(this.data.username, this.data.password).subscribe((user) => {
        if (user.ok) {
          this.localStorageService.saveUserToken(user.token);

          this.localStorageService.saveCurrentMood(new Mood(1, 'Happy'));

          // Get Likert Scale from the API
          if (this.localStorageService.getLikertScale()) {
            loading.dismiss();
            this.navCtrl.push(TabsPage, {}, { animate: true, direction: 'forward' });
          } else {
            this.likertService.getScale(user.token).subscribe((res) => {
              if (res.ok) {
                this.localStorageService.saveLikertScale(res.message);
              }

              loading.dismiss();
              this.navCtrl.push(TabsPage, {}, { animate: true, direction: 'forward' });
            });
          }
        } else {
          loading.dismiss();

          var alert = this.alertCtrl.create({
            title: 'ERROR',
            subTitle: user.message,
            buttons: ['Dismiss']
          });

          alert.present();
        }
      });
    });
  }

  forgotPassword() {
    var alert = this.alertCtrl.create({
      title: 'Ohooh!',
      subTitle: 'That is a shame you forgot you password :(',
      buttons: ['Yeah right!']
    });

    alert.present().then(value => {
      console.log(value);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

}
