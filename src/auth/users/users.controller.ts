import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthenticatedGuard } from '@api/auth/authenticated.guard';
import { UsersService } from '@api/auth/users/users.service';
import { User } from '@api/auth/user.decorator';
import { JwtPayload } from '@api/auth/auth';

@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @UseGuards(AuthenticatedGuard)
  @Get('me')
  getProfile(@User() user: JwtPayload) {
    return this.users.getUser({ id: user.id });
  }
}
