import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { MusicService } from '../../services/utils/music.service';
import { PlayerBackgroundService } from '../../services/utils/player-background.service';
import { VisibilityService } from '../../services/utils/visibility.service';
import { LocalStorageService } from '../../services/utils/local-storage.service';
import { LikertService } from '../../services/likert.service';

/**
 * Generated class for the Player page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
})
export class PlayerPage implements OnInit {

  loading: any;

  windowHeight: string;

  backgroundSwirlerInterval: any;
  progressUpdaterInterval: any;

  // currentTrack: Track;
  currentTrackPosition: number;
  currentTrackDuration: number;

  likertPosition = 2;
  likertAnswers = [];

  playButtonIcon: HTMLElement;
  pauseButtonIcon: HTMLElement;

  fixedContent: HTMLElement;
  footerElement: HTMLElement;
  tabBarElement: HTMLElement;
  scrollContent: HTMLElement;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private musicService: MusicService,
    private playerBackgroundService: PlayerBackgroundService,
    private likertService: LikertService,
    private visibilityService: VisibilityService,
    private localStorageService: LocalStorageService) {

      this.likertAnswers = this.localStorageService.getLikertScale();
    }

  ngOnInit() {
    // Start music
    if (this.navParams.get('playlist')) {

      var index = this.musicService.init(this.navParams.get('playlist'));

      if (index < 0) {
        if (this.musicService.getPlaylistLength() > this.musicService.getCurrentTrackIndex()) {
          this.skipToTrack(this.musicService.getPlaylistLength() - 1);
        } else {
          this.play();
        }
      } else {
        this.skipToTrack(index);
      }

    }
  }

  playToggle() {
    if (this.musicService.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    this.musicService.play();

    this.updateView();
  }

  pause() {
    this.musicService.pause();

    this.updateView();
  }

  resetTrack() {
    this.play();
    this.musicService.resetTrack();

  }

  skipForward() {
    if (this.musicService.playNext()) {
      this.updateView();
    } else {
      this.pause();
    }
  }

  skipBackward() {
    if (this.musicService.playPrevious()) {
      this.updateView();
    } else {
      this.resetTrack();
    }
  }

  skipToTrack(index: number) {
    if (this.musicService.playIndex(index)) {
      this.updateView();
    }
  }

  updatePlayButton() {
    if (this.pauseButtonIcon && this.playButtonIcon) {
      if (this.musicService.isPlaying) {
        this.showPauseIcon();
      } else {
        this.showPlayIcon();
      }
    }
  }

  showPlayIcon() {
    this.pauseButtonIcon.style.display = 'none';
    this.playButtonIcon.style.display = 'block';
  }

  showPauseIcon() {
    this.playButtonIcon.style.display = 'none';
    this.pauseButtonIcon.style.display = 'block';
  }

  updateTrackProgress() {
    this.currentTrackPosition = this.musicService.getTrackProgress();

    this.currentTrackDuration = this.musicService.getTrackDuration();

    if (this.currentTrackPosition && this.currentTrackDuration) {
      if (this.currentTrackDuration - this.currentTrackPosition <= 1.2) {
        this.skipForward();
      }
    }
  }

  seekTrack(position: number) {
    console.log('Seek track to: ' + position);

    this.musicService.seekTrack(position);
  }

  likertServiceUpdateDelay: any;

  updateLikert(position: number) {
    document.getElementById('helpfulness').innerHTML = this.likertAnswers[position];

    clearTimeout(this.likertServiceUpdateDelay);

    this.likertServiceUpdateDelay = setTimeout(() => {
      var userToken = this.localStorageService.getUserToken(),
      songId = this.musicService.getCurrentTrackId(),
      moodId = this.localStorageService.getCurrentMood().id,
      likertAnswer = this.likertAnswers[this.likertPosition];

      console.log(likertAnswer);
      console.log('Send likert scale');

      if (userToken && songId && moodId && likertAnswer) {
        this.likertService.sendResponse(userToken, this.musicService.getCurrentTrackId(), moodId, likertAnswer).subscribe((res) => {
          if (!res.ok) {
            console.log(res);
          }
        });
      }
    }, 5000);
  }

  setLikertMax() {
    this.likertPosition = this.likertAnswers.length - 1;

    this.updateLikert(this.likertAnswers.length - 1);
  }

  setLikertMin() {
    this.likertPosition = 0;

    this.updateLikert(0);
  }

  updateView() {
    this.updateTrackProgress();
    this.updatePlayButton();
  }

  hidePlayer() {
    this.navCtrl.pop();
  }

  updateSmallPlayButton() {
    // Play button icons
    this.playButtonIcon = <HTMLElement>document.getElementById('play-small-icon');
    this.pauseButtonIcon = <HTMLElement>document.getElementById('pause-small-icon');

    if (this.pauseButtonIcon && this.playButtonIcon) {
      if (this.musicService.isPlaying) {
        this.pauseButtonIcon.style.display = 'block';
        this.playButtonIcon.style.display = 'none';
      } else {
        this.pauseButtonIcon.style.display = 'none';
        this.playButtonIcon.style.display = 'block';
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Player');

    /* ================================= VIEW MANIPULATION ================================= */

    // Start background swirleffect
    this.windowHeight = window.innerHeight + 'px';
    this.backgroundSwirlerInterval = this.playerBackgroundService.swirlBackground(+this.localStorageService.getGradientState());

    this.progressUpdaterInterval = setInterval(() => {
      this.updateView();
    }, 1000);

    // Play button icons
    this.playButtonIcon = <HTMLElement>document.getElementById('play-icon');
    this.pauseButtonIcon = <HTMLElement>document.getElementById('pause-icon');

    // Disable Tab view
    this.visibilityService.hideTabs();

    /* =============================== VIEW MANIPULATION END =============================== */

    this.updateView();
  }

  ionViewWillLeave() {
    clearInterval(this.backgroundSwirlerInterval);
    clearInterval(this.progressUpdaterInterval);

    this.visibilityService.showTabs();
    this.visibilityService.showMusicBar();

    this.updateSmallPlayButton();

    this.localStorageService.saveGradientState(this.playerBackgroundService.step);
  }

}
