import { Pipe, PipeTransform } from "@angular/core";

import { Track } from '../model/track';

@Pipe({
    name: 'search'
})

export class SearchPipe implements PipeTransform{

    transform(songs: Track[], term: string) {

      console.log(term);

        if (!term) return songs;

        return songs.filter(function(song) {
          var include = false;

          if (song.title.toLowerCase().includes(term.toLowerCase())) {
            include = true;
          } else if (song.title.toLowerCase().includes(term.toLowerCase())) {
            include = true;
          }

          return include;
        });
    }
}
