import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicationDto } from './create-publication.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePublicationDto extends PartialType(CreatePublicationDto) {
   
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;
  
  @IsOptional()
  @IsString()
  mediaUrl?: string; // Ajout du mediaUrl

  @IsOptional()
  @IsString()
  mediaType?: string; // Ajout du mediaType
}
