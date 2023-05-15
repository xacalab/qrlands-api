import {
  IsEmail,
  IsLocale,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class PasswordSignInDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class GoogleSignInDto {
  @IsEmail()
  email: string;

  @IsLocale()
  locale: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  fullName: string;

  @IsUrl()
  @IsOptional()
  image?: string;

  @IsString()
  accessToken: string;

  @IsString()
  idToken: string;
}
