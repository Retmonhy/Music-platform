import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
export type PlaylistDocument = Playlist & Document;

@Schema()
export class Playlist {
  @Prop({ type: String, required: true })
  owner_id: string;
  @Prop({ type: String, required: true })
  name: string;
  @Prop()
  description: string;
  @Prop()
  cover: string;
  @Prop()
  tracks: string[];
}
export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
