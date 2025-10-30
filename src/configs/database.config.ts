import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigKeys } from './env-register.config';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  @Inject()
  private readonly configService: ConfigService;

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return this.configService.getOrThrow(ConfigKeys.DATABASE);
  }
}
