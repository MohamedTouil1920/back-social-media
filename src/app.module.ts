import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { SharedModule } from './shared.module';

import { LikeModule } from './like/like.module';
import { CommentaireModule } from './commentaire/commentaire.module';
import { PublicationModule } from './publication/publication.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "tek",
    entities:[User],
    autoLoadEntities: true,
    synchronize: true,
    
    }),SharedModule, AuthModule,  LikeModule, CommentaireModule, PublicationModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
