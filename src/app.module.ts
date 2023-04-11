import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ConnectionsModule } from './connections/connections.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import configuration from './config/configuration';
import { APP_GUARD } from '@nestjs/core';
import { AccessGuard } from './common/guards';

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
    PriceModule,
<<<<<<< Updated upstream
=======
    // ProductModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessGuard,
    },
>>>>>>> Stashed changes
  ],
})
export class AppModule {}
