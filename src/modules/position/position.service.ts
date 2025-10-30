import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IServiceResponse } from '@/interfaces/senior-microservice.interface';
import { CsodCreatedResponseDto } from '@/shared/dtos/created-response.dto';
import { HttpIntegrationService } from '@/shared/services/http-integration.service';
import { ConfigKeys, TCsodeAccess } from '@configs/env-register.config';
import { CsodAuthenticationService } from '@modules/csod/auth/auth.service';
import { QueryParamsDto } from '@modules/csod/shared/query-params.dto';
import { ConfigService } from '@nestjs/config';
import { OusIntegrationRoutes } from '@/shared/enums/routes.enum';
import { CreatePositionDto } from './dtos/create-position.dto';
import { CreatePositionRequestDto } from './dtos/create-position-request.dto';
import { PositionMapper } from './mappers/position.mapper';
import { AllPositionsDto } from './dtos/position.dto';

@Injectable()
export class PositionService {
  @Inject(ConfigService)
  private readonly configService: ConfigService;

  @Inject(HttpIntegrationService)
  private http: HttpIntegrationService;

  @Inject(CsodAuthenticationService)
  private authService: CsodAuthenticationService;

  @Inject(PositionMapper)
  private positionMapper: PositionMapper;

  async create(
    createPositionListDto: CreatePositionDto[],
  ): Promise<IServiceResponse<CsodCreatedResponseDto[]>> {
    const csodToken = await this.authService.getToken();

    const resultList: CsodCreatedResponseDto[] = [];

    for (const positionDto of createPositionListDto) {
      const requestBody: CreatePositionRequestDto =
        this.positionMapper.toCreateRequest(positionDto);

      try {
        const createPositionResponse = await this.http.post<
          CreatePositionRequestDto,
          CsodCreatedResponseDto
        >(this.getUrl(), requestBody, csodToken);

        resultList.push(createPositionResponse);
      } catch {
        // TODO: implement structured logging
      }
    }

    return {
      status: HttpStatus.OK,
      data: resultList,
    };
  }

  async findAll(
    queryParamsDto: QueryParamsDto,
  ): Promise<IServiceResponse<AllPositionsDto>> {
    const csodToken = await this.authService.getToken();

    const positionsResponse = await this.http.get<AllPositionsDto>(
      this.getUrl(),
      queryParamsDto,
      csodToken,
    );

    return {
      status: HttpStatus.OK,
      data: positionsResponse,
    };
  }

  private getUrl(): URL {
    const { csodBaseUrl } = this.configService.getOrThrow<TCsodeAccess>(
      ConfigKeys.CORNERSTONE,
    );

    return new URL(`${csodBaseUrl}${OusIntegrationRoutes.ORGANIZATIONS}`);
  }
}
