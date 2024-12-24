import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule),NotificationModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UserController],
})
export class UserModule {}
