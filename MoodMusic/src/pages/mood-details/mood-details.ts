import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PlayerPage } from '../player/player';

/**
 * Generated class for the MoodDetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mood-details',
  templateUrl: 'mood-details.html',
})
export class MoodDetailsPage {

  mood: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (this.navParams.get('mood')) {
      this.mood = this.navParams.get('mood');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoodDetails');
  }

  playSong() {
    this.navCtrl.push(PlayerPage);
  }

}
