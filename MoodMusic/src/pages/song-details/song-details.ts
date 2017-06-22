import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Track } from '../../model/track';

/**
 * Generated class for the SongDetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-song-details',
  templateUrl: 'song-details.html',
})
export class SongDetailsPage {

  song: Track;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.song = navParams.get('song');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SongDetails');
  }

}
