import { IsArray, IsString } from 'class-validator';

export class BasePlaylistDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  cover: string;
  @IsArray({})
  tracks: string[];
}
