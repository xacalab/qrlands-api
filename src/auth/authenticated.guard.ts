import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

/**
 * Forces users to be authenticated.
 */
@Injectable()
export class AuthenticatedGuard extends PassportAuthGuard('jwt') {}
