import { IsString } from 'class-validator';

export class CreateMagicDto {
  @IsString()
  prompt: string;

  @IsString()
  base64Image: string;
}
