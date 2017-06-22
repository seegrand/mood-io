export class Song {
  id: number;
  name: string;
  path: string;
  tag: string;
  artistId: number;
  albumId: number;
  genreId: number;
  moodId: number;

  artist: {
    id: number;
    name: string;
  };
}
