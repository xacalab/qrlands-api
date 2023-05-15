import { Body, Controller, Post } from '@nestjs/common';

import { GoogleSignInDto, PasswordSignInDto } from '@api/auth/auth/domain';
import { AuthService } from '@api/auth/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('sign-in/google')
  googleSignIn(@Body() body: GoogleSignInDto) {
    return this.auth.googleSignIn(body);
  }

  @Post('sign-in/password')
  passwordSignIn(@Body() body: PasswordSignInDto) {
    return this.auth.passwordSignIn(body);
  }
}
