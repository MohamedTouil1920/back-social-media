import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { NotificationGateway } from './notification.gateawy';
import { Commentaire } from 'src/commentaire/entities/commentaire.entity';
import { User } from 'src/user/entities/user.entity';
import { Publication } from 'src/publication/entities/publication.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notification,Commentaire,User,Publication])],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationGateway],
  exports: [NotificationService],
})
export class NotificationModule {}
