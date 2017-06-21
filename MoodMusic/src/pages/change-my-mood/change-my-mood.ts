import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PlayerPage } from '../player/player';

import { MoodService } from '../../services/mood.service';
import { SongService } from '../../services/song.service';

import { LocalStorageService } from '../../services/utils/local-storage.service';
import { VisibilityService } from '../../services/utils/visibility.service';

import { Mood } from '../../model/mood';

/**
 * Generated class for the ChangeMyMood page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-change-my-mood',
  templateUrl: 'change-my-mood.html',
})
export class ChangeMyMoodPage {

  isNavigatingToPlayer = false;

  pageSize = 9;
  private mood: Mood;
  private moods: Mood[];
  paginatedMoods: any[];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private moodService: MoodService,
    private songService: SongService,
    private localStorageService: LocalStorageService,
    private visibilityService: VisibilityService
  ) { }

  getMoods() {
    this.moodService.getMoods().subscribe((moods) => {
      this.moods = moods.message;

      this.paginatedMoods = this.moodService.getPaginatedMoods(this.moods, this.pageSize);
      console.log(this.paginatedMoods);
    });
  }

  currentMood(mood) {
    this.mood = mood;
    console.log(this.mood);
  }

  startPlaying() {
    // TODO: Register mood with the API.
    this.localStorageService.saveCurrentMood(this.mood);

    this.isNavigatingToPlayer = true;
    this.navCtrl.pop();

    var data = this.songService.getSongsLocal();

    this.navCtrl.push(PlayerPage, data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeMyMood');

    this.getMoods();
	}

  ionViewDidEnter() {
    // Disable Tab view
    this.visibilityService.hideTabs();
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave ChangeMyMood');

    if (!this.isNavigatingToPlayer) {
      this.visibilityService.showTabs();
      this.visibilityService.showMusicBar();
    }
  }

}
