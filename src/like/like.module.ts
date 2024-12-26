import { Module } from '@nestjs/common';
import { LikesService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { PublicationModule } from 'src/publication/publication.module';
import { CommentaireModule } from 'src/commentaire/commentaire.module';
import { UserModule } from 'src/user/user.module';
import { NotificationModule } from 'src/notification/notification.module';
import { Commentaire } from 'src/commentaire/entities/commentaire.entity';
import { Publication } from 'src/publication/entities/publication.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Like,Commentaire,Publication,User]),
  PublicationModule,CommentaireModule,UserModule,NotificationModule
],
  controllers: [LikeController],
  providers: [LikesService],
})
export class LikeModule {}
