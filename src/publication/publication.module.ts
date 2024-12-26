import { forwardRef, Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publication } from './entities/publication.entity';
import { UserModule } from 'src/user/user.module';
import { LikeModule } from 'src/like/like.module';
import { CommentaireModule } from 'src/commentaire/commentaire.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Publication]),
    UserModule,
    forwardRef(()=>LikeModule),
    forwardRef(() => CommentaireModule)
   
  ],
  controllers: [PublicationController],
  providers: [PublicationService],
})
export class PublicationModule {}
