import { IsOptional, IsString } from 'class-validator';

export class UpdateCommentaireDto {
  @IsOptional()
  @IsString()
  content?: string;
}
