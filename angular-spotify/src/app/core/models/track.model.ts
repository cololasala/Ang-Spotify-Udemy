import { ArtistModel } from "./artist.model";

export interface TrackModel {
  _id: number,
  name: string;
  album: string;
  cover: string;
  url: string;
  artist: ArtistModel;
}
