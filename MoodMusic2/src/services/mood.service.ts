import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Mood Service.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on services and Angular 2 DI.
*/
@Injectable()
export class MoodService {

  private baseURL = 'https://moodapi.herokuapp.com';

  constructor(public http: Http) { }

  getMoods() {

    return this.http
      .get(this.baseURL + '/moods')
      .toPromise()
      .then(res => {
        return res.json();
      });
  }

  getRecentMoods() {

    return this.http
      .get(this.baseURL + '/moods')
      .toPromise()
      .then(res => {
        return res.json();
      });
  }

  // getStaticMoods() {
  //   return [{
  //     name: "Happy",
  //     placeholder: "http://placehold.it/85x85"
  //   }, {
  //     name: "Sad",
  //     placeholder: "http://placehold.it/85x85"
  //   }, {
  //     name: "Anxious",
  //     placeholder: "http://placehold.it/85x85"
  //   }, {
  //     name: "Nervous",
  //     placeholder: "http://placehold.it/85x85"
  //   }, {
  //     name: "Excited",
  //     placeholder: "http://placehold.it/85x85"
  //   }, {
  //     name: "Energetic",
  //     placeholder: "http://placehold.it/85x85"
  //   } , {
  //     name: "Romance",
  //     placeholder: "http://placehold.it/85x85"
  //   }, {
  //     name: "Depressed",
  //     placeholder: "http://placehold.it/85x85"
  //   }, {
  //     name: "Tired",
  //     placeholder: "http://placehold.it/85x85"
  //   }]
  // }

}
