import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { IntroPage } from '../intro/intro';

/**
 * Generated class for the Settings page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  logout() {
    this.navCtrl.setRoot(IntroPage, {}, { animate: true, direction: 'back' });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Settings');
  }

}
