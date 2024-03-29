import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';


import { DbModule } from './common/db/db.module';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  DbModule,
  UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}