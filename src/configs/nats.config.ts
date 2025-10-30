import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProvider,
  type ClientsModuleOptionsFactory,
} from '@nestjs/microservices';
import { ConfigKeys } from './env-register.config';

@Injectable()
export class NATSConfig implements ClientsModuleOptionsFactory {
  @Inject()
  private readonly configService: ConfigService;

  createClientOptions(): Promise<ClientProvider> | ClientProvider {
    return this.configService.getOrThrow(ConfigKeys.NATS);
  }
}
