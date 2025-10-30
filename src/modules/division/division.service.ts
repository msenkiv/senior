import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IServiceResponse } from '@/interfaces/senior-microservice.interface';
import { CsodCreatedResponseDto } from '@/shared/dtos/created-response.dto';
import { HttpIntegrationService } from '@/shared/services/http-integration.service';
import { ConfigKeys, TCsodeAccess } from '@configs/env-register.config';
import { CsodAuthenticationService } from '@modules/csod/auth/auth.service';
import { QueryParamsDto } from '@modules/csod/shared/query-params.dto';
import { ConfigService } from '@nestjs/config';
import { OusIntegrationRoutes } from '@/shared/enums/routes.enum';
import { CreateDivisionDto } from './dtos/create-division.dto';
import { CreateDivisionRequestDto } from './dtos/create-division-request.dto';
import { DivisionMapper } from './mappers/division.mapper';
import { AllDivisionsDto } from './dtos/division.dto';

@Injectable()
export class DivisionService {
  @Inject(ConfigService)
  private readonly configService: ConfigService;

  @Inject(HttpIntegrationService)
  private http: HttpIntegrationService;

  @Inject(CsodAuthenticationService)
  private authService: CsodAuthenticationService;

  @Inject(DivisionMapper)
  private divisionMapper: DivisionMapper;

  async create(
    createDivisionListDto: CreateDivisionDto[],
  ): Promise<IServiceResponse<CsodCreatedResponseDto[]>> {
    const csodToken = await this.authService.getToken();

    const resultList: CsodCreatedResponseDto[] = [];

    for (const divisionDto of createDivisionListDto) {
      const requestBody: CreateDivisionRequestDto =
        this.divisionMapper.toCreateRequest(divisionDto);

      try {
        const createDivisionResponse = await this.http.post<
          CreateDivisionRequestDto,
          CsodCreatedResponseDto
        >(this.getUrl(), requestBody, csodToken);

        resultList.push(createDivisionResponse);
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
  ): Promise<IServiceResponse<AllDivisionsDto>> {
    const csodToken = await this.authService.getToken();

    const divisionsResponse = await this.http.get<AllDivisionsDto>(
      this.getUrl(),
      queryParamsDto,
      csodToken,
    );

    return {
      status: HttpStatus.OK,
      data: divisionsResponse,
    };
  }

  private getUrl(): URL {
    const { csodBaseUrl } = this.configService.getOrThrow<TCsodeAccess>(
      ConfigKeys.CORNERSTONE,
    );

    return new URL(`${csodBaseUrl}${OusIntegrationRoutes.ORGANIZATIONS}`);
  }
}
