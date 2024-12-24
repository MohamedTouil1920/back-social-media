import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentaireDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}
