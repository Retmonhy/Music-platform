import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String, unique: true, required: true })
  email: string;
  @Prop({ type: String })
  firstname: string;
  @Prop({ type: String })
  surname: string;
  @Prop({ type: String, required: true })
  password: string;
  @Prop({ default: false, type: String })
  isActivated: boolean;
  @Prop()
  activationLink: string;
  @Prop()
  tracks: string[];
  @Prop()
  playlists: string[];
}
export const UserSchema = SchemaFactory.createForClass(User);
