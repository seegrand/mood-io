import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { APIService } from './api.service';

import { Genre } from '../model/genre';

/*
  Generated class for the Genre Service.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on services and Angular 2 DI.
*/
@Injectable()
export class GenreService extends APIService {

  constructor(http: Http) {
    super(http);
  }

  getGenres(): Observable<Genre[]> {
    return this.http.get(this.BASE_URL + "/genres")
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPaginatedGenres(genres: Genre[], pageSize: number) {
    var paginatedGenres = [];

    var page = [];
    var index = 0;

    for (var genre of genres) {

      if (index < pageSize) {
        page.push(genre);
        index++;
      } else {
        paginatedGenres.push(page);
        page = [];
        index = 0;
      }
    }

    paginatedGenres.push(page);

    return paginatedGenres;
  }

  saveLikedGenres(liked: any) {
    // TODO: Send to the API (when it eventually works... )
    console.log(liked);
    // return this.http.post(this.BASE_URL + "/genres/like", liked)
    //                       .map((res: Response) => res.json())
    //                       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  saveDislikedGenres(disliked: any){
    // TODO: Send to the API (when it eventually works... )
    console.log(disliked);
    // return this.http.post(this.BASE_URL + "/genres/dislike", disliked)
    //                       .map((res: Response) => res.json())
    //                       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
