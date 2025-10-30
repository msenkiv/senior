import { registerAs } from '@nestjs/config';
import { type ClientProvider, Transport } from '@nestjs/microservices';
import { type TypeOrmModuleOptions } from '@nestjs/typeorm';

export enum ConfigKeys {
  APP = 'app',
  NATS = 'nats',
  DATABASE = 'database',
  CORNERSTONE = 'csod',
}

// App configs
const appConfig = registerAs(ConfigKeys.APP, () => {
  return {
    environment: process.env.NODE_ENV!,
  };
});
export type TAppConfig = ReturnType<typeof appConfig>;

// NATS configs
const natsConfig = registerAs(ConfigKeys.NATS, (): ClientProvider => {
  return {
    transport: Transport.NATS,
    options: {
      servers: [process.env.NATS_SERVER!],
    },
  };
});

// CSOD_ACCESS config
const csodAccess = registerAs(ConfigKeys.CORNERSTONE, () => {
  return {
    csodBaseUrl: process.env.CORNERSTONE_BASE_URL!,
    clientId: process.env.CORNERSTONE_CLIENT_ID!,
    clientSecret: process.env.CORNERSTONE_CLIENT_SECRET!,
  };
});
export type TCsodeAccess = ReturnType<typeof csodAccess>;

// Database configs
const databaseConfig = registerAs(
  ConfigKeys.DATABASE,
  (): TypeOrmModuleOptions => {
    return {
      type: 'oracle',
      host: process.env.DATABASE_HOST!,
      port: Number(process.env.DATABASE_PORT!),
      username: process.env.DATABASE_USER!,
      password: process.env.DATABASE_PASS!,
      serviceName: process.env.DATABASE_NAME,
      thickMode: true,
      autoLoadEntities: true,
      logging: false,
      // JAMAIS habilitar essa configuração
      synchronize: false,
    };
  },
);

export default [appConfig, natsConfig, databaseConfig, csodAccess];
