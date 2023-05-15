import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { GoogleSignInDto, PasswordSignInDto } from '@api/auth/auth/domain';
import { UsersService } from '@api/auth/users';
import { User } from '@api/auth/models';
import { Logger } from '@api/common';

export interface JwtPayload {
  sub: string;
  iat: number;
  id: string;
  email: string;
  name: string;
  image: string;
}

export enum Provider {
  google = 'google',
  password = 'password',
}

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(private users: UsersService, private jwt: JwtService) {}

  async signInResponse(user: User) {
    return {
      jwt: await this.getJwt(user),
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
    };
  }

  /**
   * Tries to sign in an already existing user through password.
   * @param credentials An object including email and password.
   * @returns An JWT token for the user.
   */
  async passwordSignIn({ email, password }: PasswordSignInDto) {
    const user = await this.users.getUser({ email });

    if (!user || !(await user.validatePassword(password))) {
      throw new HttpException(
        { message: 'Incorrect user or password' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    this.logger.debug(`Password sign in for ${user.email}`);
    return this.signInResponse(user);
  }

  /**
   * Gets or creates a user using Google's data
   * @param userSkeleton User info from Google.
   * @returns User created or retrieved.
   */
  async googleSignIn(userSkeleton: GoogleSignInDto) {
    let user = await this.users.getUser({ email: userSkeleton.email });

    if (!user) {
      user = await this.users
        .createUser({
          email: userSkeleton.email,
          name: userSkeleton.fullName,
          firstName: userSkeleton.firstName,
          lastName: userSkeleton.lastName,
          locale: userSkeleton.locale,
          image: userSkeleton.image,
        })
        .catch((err: Error) => {
          if (err.message.includes('duplicate key')) {
            throw new HttpException(
              { message: 'Email already registered' },
              HttpStatus.CONFLICT,
            );
          }

          this.logger.warn(`Unknown Error: ${err.message}`);
          throw new HttpException(
            {
              dev: {
                errorMessage: err.message,
                stackTrace: err.stack,
              },
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        });
    }

    this.logger.debug(`Google sign in for ${user.email}`);
    return this.signInResponse(user);
  }

  async getJwt(user: User) {
    const { id, name, email, image } = user;

    const payload: Omit<JwtPayload, 'sub' | 'iat'> = {
      id,
      email,
      name,
      image,
    };

    return this.jwt.sign(payload, { subject: `${user.id}` });
  }
}
