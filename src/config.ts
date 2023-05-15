import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { JwtSignOptions } from '@nestjs/jwt';
import { config } from 'dotenv';

config();

const DEFAULT_PORT = 3666;

function getPort(port = Number(process.env.PORT)): number {
  return port > 0 && port < 65536 ? port : DEFAULT_PORT;
}

export const ENV: string = (() => {
  const env: string = process.env.NODE_ENV;
  return ['test', 'development', 'production'].includes(env)
    ? env
    : 'development';
})();

function getDbType(): 'postgres' | 'cockroachdb' {
  if (process.env.POSTGRES_TYPE === 'cockroachdb') {
    return 'cockroachdb';
  }

  return 'postgres';
}

export const jwtOpts: JwtSignOptions = { secret: process.env.SECRET };
export const LOG_LEVEL = process.env.LOG_LEVEL;
export const NODE_ENV = process.env.NODE_ENV ?? 'development';
export const isProd = ENV === 'production';
export const GLOBAL_API_PREFIX = 'api';
export const DEFAULT_API_VERSION = '1';
export const PORT = getPort();
export const typeorm: TypeOrmModuleOptions = {
  autoLoadEntities: true,
  verboseRetryLog: true,
  synchronize: !isProd,
  type: getDbType(),
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
  namingStrategy: new SnakeNamingStrategy(),
  ssl: !!process.env.POSTGRES_SSL,
};
