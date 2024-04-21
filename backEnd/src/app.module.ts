import { ConfigModule } from '@nestjs/config';
import { DbModule } from './common/db/db.module';
import { UserModule } from './module/user/user.module';
import { ProductModule } from './module/product/product.module';
import { BrandModule } from './module/brand/brand.module';
import { CategoryModule } from './module/category/category.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    UserModule,
    ProductModule,
    BrandModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}