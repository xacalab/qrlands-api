import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { AuthController, AuthService } from '@api/auth/auth';
import { JwtAuthGuard } from '@api/auth/jwt-auth.guard';
import { JwtStrategy } from '@api/auth/jwt.strategy';
import { UsersController } from '@api/auth/users';
import { UsersService } from '@api/auth/users';
import { CommonModule } from '@api/common';
import { User } from '@api/auth/models';
import { jwtOpts } from '@api/config';

const typeormModule = TypeOrmModule.forFeature([User]);

@Module({
  imports: [CommonModule, typeormModule, JwtModule.register(jwtOpts)],
  providers: [
    UsersService,
    AuthService,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  controllers: [AuthController, UsersController],
  exports: [typeormModule],
})
export class AuthModule {}
