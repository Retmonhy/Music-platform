export class PlaylistDto {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  cover: string;
  numberOfTracks: number;
  tracks: string[];

  constructor(model) {
    this.id = model._id;
    this.ownerId = model.ownerId;
    this.name = model.name;
    this.description = model.description;
    this.cover = model.cover;
    this.numberOfTracks = model.tracks.length;
    this.tracks = model.tracks;
  }
}
