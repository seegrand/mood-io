import { Injectable } from '@angular/core';

@Injectable()
export class VisibilityService {

  constructor() { }

  hideMusicBar() {
    var footerElements: NodeListOf<HTMLElement> = <NodeListOf<HTMLElement>>document.querySelectorAll('.footer#music-bar');
    var scrollContents: NodeListOf<HTMLElement> = <NodeListOf<HTMLElement>>document.querySelectorAll('ion-content.content > .scroll-content');

    if (footerElements) {
      for (var i = 0; i < footerElements.length; i++) {
        footerElements.item(i).style.display = 'none';
      }
    }

    if (scrollContents) {
      for (var i = 0; i < scrollContents.length; i++) {
        scrollContents.item(i).style.setProperty('margin-bottom', '56px', 'important');
      }
    }
  }

  showMusicBar() {
    var footerElements: NodeListOf<HTMLElement> = <NodeListOf<HTMLElement>>document.querySelectorAll('.footer#music-bar');
    var scrollContents: NodeListOf<HTMLElement> = <NodeListOf<HTMLElement>>document.querySelectorAll('ion-content.content > .scroll-content');

    if (footerElements) {
      for (var i = 0; i < footerElements.length; i++) {
        footerElements.item(i).style.display = 'flex';
      }
    }

    if (scrollContents) {
      for (var i = 0; i < scrollContents.length; i++) {
        scrollContents.item(i).style.setProperty('margin-bottom', '112px', 'important');
      }
    }
  }

  hideScrollContentMargin() {
    var scrollContents: NodeListOf<HTMLElement> = <NodeListOf<HTMLElement>> document.querySelectorAll('ion-content.content > .scroll-content');

    console.log(scrollContents);

    if (scrollContents) {
      for (var i = 0; i < scrollContents.length; i++) {
        scrollContents.item(i).style.setProperty('margin-bottom', '0px', 'important');
      }
    }
  }

  hideTabs() {
    this.hideMusicBar();

    var tabBarElements: NodeListOf<HTMLElement> = <NodeListOf<HTMLElement>>document.querySelectorAll('.tabbar.show-tabbar');
    // var fixedContents: NodeListOf<HTMLElement> = <NodeListOf<HTMLElement>>document.querySelectorAll('div.fixed-content');
    // var scrollContents: NodeListOf<HTMLElement> = <NodeListOf<HTMLElement>>document.querySelectorAll('div.scroll-content');

    if (tabBarElements) {
      for (var i = 0; i < tabBarElements.length; i++) {
        tabBarElements.item(i).style.display = 'none';
      }
    }

    this.hideScrollContentMargin();
  }

  showTabs() {
    var tabBarElements: NodeListOf<HTMLElement> = <NodeListOf<HTMLElement>>document.querySelectorAll('.tabbar.show-tabbar');
    var scrollContents: NodeListOf<HTMLElement> = <NodeListOf<HTMLElement>>document.querySelectorAll('ion-content.content > .scroll-content');

    if (tabBarElements) {
      for (var i = 0; i < tabBarElements.length; i++) {
        tabBarElements.item(i).style.display = 'flex';
      }
    }

    if (scrollContents) {
      for (var i = 0; i < scrollContents.length; i++) {
        scrollContents.item(i).style.setProperty('margin-bottom', '56px', 'important');
      }
    }
  }
}
