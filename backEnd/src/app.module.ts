import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DbModule } from './common/db/db.module';
import { UserModule } from './module/user/user.module';
import { ProductModule } from './module/product/product.module';
import { BrandModule } from './module/brand/brand.module';
import { CategoryModule } from './module/category/category.module';
import { CartModule } from './module/cart/cart.module';
import { OrdersModule } from './module/order/order.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    UserModule,
    ProductModule,
    BrandModule,
    CategoryModule,
    CartModule,
    OrdersModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'), // Make sure you have MAIL_HOST defined in your environment
          port: configService.get<string>('MAIL_PORT'),
          secure: false,
          auth: {
            user: configService.get<string>('MAIL_USER'), // Update with your email address
            pass: configService.get<string>('MAIL_PASSWORD'), // Update with your email password
          },
        },
        defaults: {
          from: `"No Reply" <${configService.get<string>('MAIL_FROM')}>`, // Fix string interpolation
        },
        template: {
          dir: __dirname + '/templates',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
