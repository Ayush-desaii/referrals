import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersRef } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { JwtCookieAuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'referal',
      entities: [UsersRef],
      synchronize: true, // Set to false in production
    }),
    UserModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey', // Keep this secret in env file
      signOptions: { expiresIn: '1d' }, // Token expiration time
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtCookieAuthMiddleware).forRoutes('user/get');
  }
}
