import { IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly artist: string;
  @IsString()
  readonly text: string;
  readonly picture: string;
  readonly audio: string;
}
