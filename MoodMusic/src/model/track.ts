import { ITrackConstraint } from 'ionic-audio';

export class Track implements ITrackConstraint {
  trackId: number;
  title: string;
  cleanTitle: string;
  artist: string;
  src: string;
  preload: string = 'metadata';
}
