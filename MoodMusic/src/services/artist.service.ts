import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { APIService } from './api.service';

/*
  Generated class for the Artist Service.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on services and Angular 2 DI.
*/

@Injectable()
export class ArtistService extends APIService {

  constructor(http: Http) {
    super(http);
  }

  getArtists(): Observable<any> {
    return this.http.get(this.BASE_URL + "/artists")
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getArtist(id: number): Observable<any> {
    return this.http.get(this.BASE_URL + "/artists/" + id)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
