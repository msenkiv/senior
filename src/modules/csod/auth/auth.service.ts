import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { IServiceResponse } from '@/interfaces/senior-microservice.interface';
import { CsodCredentialsDto } from './dtos/csod-credentials';
import { ConfigService } from '@nestjs/config';
import { ConfigKeys, TCsodeAccess } from '@configs/env-register.config';
import { NATS_SESSION_CSOD } from '@/utils/constants/shared.constants';

@Injectable()
export class CsodAuthenticationService {
  private readonly logger = new Logger(CsodAuthenticationService.name);

  @Inject('NATS_CLIENT')
  private readonly natsClient: ClientProxy;

  @Inject(ConfigService)
  private readonly configService: ConfigService;

  async getToken(): Promise<string> {
    try {
      const authCsodCredentials = this.getCredentials();
      const response = await firstValueFrom<IServiceResponse<string>>(
        this.natsClient.send(NATS_SESSION_CSOD, authCsodCredentials),
      );

      if (!response?.data) {
        this.logger.error('getToken() :: NATS não retornou token CSOD.');
        throw new UnauthorizedException('Falha ao obter token CSOD.');
      }

      return response.data;
    } catch (error) {
      this.logger.error(
        'Erro ao obter token CSOD via NATS',
        error instanceof Error ? error : undefined,
        error,
      );
      throw new UnauthorizedException('Não foi possível obter token CSOD.');
    }
  }

  private getCredentials(): CsodCredentialsDto {
    try {
      const { clientId, clientSecret } =
        this.configService.getOrThrow<TCsodeAccess>(ConfigKeys.CORNERSTONE);
      const csodCredentialsDto = new CsodCredentialsDto();
      csodCredentialsDto.clientId = clientId;
      csodCredentialsDto.clientSecret = clientSecret;
      csodCredentialsDto.grantType = 'client_credentials';
      csodCredentialsDto.scope = 'all';
      return csodCredentialsDto;
    } catch (error) {
      this.logger.error('Falha ao carregar credenciais', error);
      throw new UnprocessableEntityException('Falha ao carregar credenciais');
    }
  }
}
