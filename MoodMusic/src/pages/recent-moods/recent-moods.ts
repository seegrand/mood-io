import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MoodDetailsPage } from '../mood-details/mood-details';

import { MoodService } from '../../services/mood.service';

/**
 * Generated class for the RecentMoods page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-recent-moods',
  templateUrl: 'recent-moods.html',
})
export class RecentMoodsPage {

  recentMoods: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private moodService: MoodService) {
    this.recentMoods = this.moodService.getRecentMoodsLocal();
  }

  moodDetails(data) {

    // TODO:
    // [GET] Mood Details - https://mood-io.herokuapp.com/moods/:id
    // Pass mood id as parameter.
    // This route is not yet implemented.

    var mood = {
      mood: data
    }

    this.navCtrl.push(MoodDetailsPage, mood);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecentMoods');
  }

}
