import { Module, Global } from '@nestjs/common';
import { UserModule } from './user/user.module';

@Global()
@Module({
  imports: [UserModule],
  exports: [UserModule],
})
export class SharedModule {}
