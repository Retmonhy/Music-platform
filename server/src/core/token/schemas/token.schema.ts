import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: string;
  @Prop({ type: String, required: true })
  refreshToken: string;
}
export const TokenSchema = SchemaFactory.createForClass(Token);
