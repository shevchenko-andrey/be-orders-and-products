import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AccessGuard } from './common/guards';
import configuration from './config/configuration';
import { ConnectionsModule } from './connections/connections.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

// TODO: add app folder and remove app.module.ts

@Module({
  imports: [
    ConnectionsModule,
    UserModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return configService.get('typeOrmDatabase');
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ProductModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessGuard,
    },
  ],
})
export class AppModule {}
