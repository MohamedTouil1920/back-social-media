import { Module } from '@nestjs/common';
import { CommentaireService } from './commentaire.service';
import { CommentaireController } from './commentaire.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicationModule } from 'src/publication/publication.module';
import { UserModule } from 'src/user/user.module';
import { Commentaire } from './entities/commentaire.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Commentaire]),
    UserModule, 
    PublicationModule, 
  ],
  controllers: [CommentaireController],
  providers: [CommentaireService],
})
export class CommentaireModule {}
