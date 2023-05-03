import { UserDto } from '../../user/dto/User.dto';
import {
  IsArray,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsObject,
} from 'class-validator';

export class CreatePlaylistDto {
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
