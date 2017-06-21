import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { LikedGenresPage } from '../liked-genres/liked-genres';

import { AuthService } from '../../services/auth.service';
import { LikertService } from '../../services/likert.service';

import { LocalStorageService } from '../../services/utils/local-storage.service';
import { VisibilityService } from '../../services/utils/visibility.service';

import { Mood } from '../../model/mood';

/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

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
    private localStorageService: LocalStorageService) { }

  register() {
    var loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Registering...'
    });

    loading.present().then(() => {

      this.authService.register(this.data.username, this.data.password).subscribe((user) => {
        if (user.ok) {
          this.localStorageService.saveUserToken(user.token);

          this.localStorageService.saveCurrentMood(new Mood(1, 'Happy'));

          // Get Likert Scale from the API
          if (this.localStorageService.getLikertScale()) {
            loading.dismiss();
            this.navCtrl.push(LikedGenresPage, {}, { animate: true, direction: 'forward' });
          } else {
            this.likertService.getScale(user.token).subscribe((res) => {
              if (res.ok) {
                this.localStorageService.saveLikertScale(res.message);
              }

              loading.dismiss();
              this.navCtrl.push(LikedGenresPage, {}, { animate: true, direction: 'forward' });
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');
  }

  ionViewDidEnter() {
    this.visibilityService.hideScrollContentMargin();
  }

}
