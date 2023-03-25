import { IsArray, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class BasePlaylistDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  description: string;
  @IsString()
  @IsOptional()
  cover: string;
  @IsArray({})
  tracks: string[];
}
