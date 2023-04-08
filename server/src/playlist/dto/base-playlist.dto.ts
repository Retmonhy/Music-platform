import { UserDto } from './../../user/dto/user.dto';
import {
  IsArray,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsObject,
} from 'class-validator';

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
  @IsObject()
  owner: UserDto;
}
