import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePlaylistDto {
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
