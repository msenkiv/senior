import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IServiceResponse } from '@/interfaces/senior-microservice.interface';
import { CsodCreatedResponseDto } from '@/shared/dtos/created-response.dto';
import { HttpIntegrationService } from '@/shared/services/http-integration.service';
import { ConfigKeys, TCsodeAccess } from '@configs/env-register.config';
import { CsodAuthenticationService } from '@modules/csod/auth/auth.service';
import { QueryParamsDto } from '@modules/csod/shared/query-params.dto';
import { ConfigService } from '@nestjs/config';
import { OusIntegrationRoutes } from '@/shared/enums/routes.enum';
import { CreateJobPositionDto } from './dtos/create-job-position.dto';
import { CreateJobPositionRequestDto } from './dtos/create-job-position-request.dto';
import { JobPositionMapper } from './mappers/job-position.mapper';
import { AllJobPositionsDto } from './dtos/job-position.dto';

@Injectable()
export class JobPositionService {
  @Inject(ConfigService)
  private readonly configService: ConfigService;

  @Inject(HttpIntegrationService)
  private http: HttpIntegrationService;

  @Inject(CsodAuthenticationService)
  private authService: CsodAuthenticationService;

  @Inject(JobPositionMapper)
  private jobPositionMapper: JobPositionMapper;

  async create(
    createJobPositionListDto: CreateJobPositionDto[],
  ): Promise<IServiceResponse<CsodCreatedResponseDto[]>> {
    const csodToken = await this.authService.getToken();

    const resultList: CsodCreatedResponseDto[] = [];

    for (const jobPositionDto of createJobPositionListDto) {
      const requestBody: CreateJobPositionRequestDto =
        this.jobPositionMapper.toCreateRequest(jobPositionDto);

      try {
        const createJobPositionResponse = await this.http.post<
          CreateJobPositionRequestDto,
          CsodCreatedResponseDto
        >(this.getUrl(), requestBody, csodToken);

        resultList.push(createJobPositionResponse);
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
  ): Promise<IServiceResponse<AllJobPositionsDto>> {
    const csodToken = await this.authService.getToken();

    const jobPositionsResponse = await this.http.get<AllJobPositionsDto>(
      this.getUrl(),
      queryParamsDto,
      csodToken,
    );

    return {
      status: HttpStatus.OK,
      data: jobPositionsResponse,
    };
  }

  private getUrl(): URL {
    const { csodBaseUrl } = this.configService.getOrThrow<TCsodeAccess>(
      ConfigKeys.CORNERSTONE,
    );

    return new URL(`${csodBaseUrl}${OusIntegrationRoutes.ORGANIZATIONS}`);
  }
}
