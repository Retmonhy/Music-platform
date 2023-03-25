export class PlaylistDto {
  id: string;
  owner_id: string;
  name: string;
  description: string;
  cover: string;
  numberOfTracks: number;
  tracks: string[];

  constructor(model) {
    this.id = model._id;
    this.owner_id = model.owner_id;
    this.name = model.name;
    this.description = model.description;
    this.cover = model.cover;
    this.numberOfTracks = model.tracks.length;
    this.tracks = model.tracks;
  }
}
