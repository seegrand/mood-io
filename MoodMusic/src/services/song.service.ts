import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { APIService } from './api.service';

import { Song } from '../model/song';
import { Track } from '../model/track';

/*
  Generated class for the Genre Service.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on services and Angular 2 DI.
*/

@Injectable()
export class SongService extends APIService {

  limit = 10;

  constructor(http: Http) {
    super(http);
  }

  getMusicFileServiceURL(): string {
    return 'http://nas1.tyil.net';
  }

  convertSongToTrack(song: Song): Track {
    var track: Track = new Track();

    console.log(song);

    track.trackId = song.id;
    track.title = song.name;
    track.cleanTitle = song.name.replace(/[|&;$%@"'<>()+,]/g, "");

    track.src = this.getMusicFileServiceURL() + encodeURI(song.path);

    if (song.artist) {
      track.artist = song.artist.name;
    }

    return track;
  }

  getSongs(): Observable<any> {
    return this.http.get(this.BASE_URL + "/songs")
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getRecentSongs(token): Observable<any> {

    var options = super.createAuthenticationRequestOptions(token);

    return this.http.get(this.BASE_URL + '/songs/recent/' + this.limit, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));

  }

  getTenRecentSongs(token): Observable<any> {

    var options = super.createAuthenticationRequestOptions(token);

    return this.http.get(this.BASE_URL + '/songs/recent/' + this.limit, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  getSong(id: number, token: string): Observable<any> {
    var options = super.createAuthenticationRequestOptions(token);

    return this.http.get(this.BASE_URL + '/songs/' + id, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  getSongsLocal() {
    var songs = {
      'playlist':
      [
        {
          trackId: 1,
          title: 'Why Georgia',
          artist: 'John Mayer',
          src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t12-MP3-V0.mp3',
          preload: 'metadata', // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
        },
        {
          trackId: 2,
          title: 'Bohemian Rhapsody',
          artist: 'Queen',
          src: 'http://nas1.tyil.net/Queen%20-%20A%20Night%20At%20The%20Opera%20-%20MFSL%20GOLD%20UDCD%20568%20-%201975/11-Queen-Bohemian%20Rhapsody.flac',
          preload: 'metadata'
        },
        {
          trackId: 3,
          title: 'Satisfy My Soul',
          artist: 'Bob Marley',
          src: 'http://nas1.tyil.net/Bob%20Marley%20-%20Kaya/05%20-%20Bob%20Marley%20-%20Satisfy%20My%20Soul.flac',
          preload: 'metadata'
        },
        {
          trackId: 4,
          title: 'Hotel California',
          artist: 'Eagles',
          src: 'http://nas1.tyil.net/Eagles%20-%20Hotel%20California%20%28Original%29%20%28FLAC%29/01%20-%20Hotel%20California.flac',
          preload: 'metadata'
        }
      ]
    };

    return songs;
  }

}
