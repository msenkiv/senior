import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCostCenterDto } from './dtos/create-cost-center.dto';
import { CsodCreatedResponseDto } from '@/shared/dtos/created-response.dto';
import { IServiceResponse } from '@/interfaces/senior-microservice.interface';
import { ConfigService } from '@nestjs/config';
import { ConfigKeys, TCsodeAccess } from '@configs/env-register.config';
import { OusIntegrationRoutes } from '@/shared/enums/routes.enum';
import { CsodAuthenticationService } from '@modules/csod/auth/auth.service';
import { CreateCostCenterRequestDto } from './dtos/create-cost-center-request.dto';
import { CostCenterMapper } from './mappers/cost-center.mapper';
import { HttpIntegrationService } from '@/shared/services/http-integration.service';
import { QueryParamsDto } from '@modules/csod/shared/query-params.dto';

@Injectable()
export class CostCenterService {
  @Inject(ConfigService)
  private readonly configService: ConfigService;

  @Inject(CsodAuthenticationService)
  private authService: CsodAuthenticationService;

  @Inject(CostCenterMapper)
  private costCenterMapper: CostCenterMapper;

  @Inject(HttpIntegrationService)
  private http: HttpIntegrationService;

  async create(
    createCostCenterListDto: CreateCostCenterDto[],
  ): Promise<IServiceResponse<CsodCreatedResponseDto[]>> {
    const csodToken = await this.authService.getToken();
    const resultList: CsodCreatedResponseDto[] = [];

    for (const costCenterDto of createCostCenterListDto) {
      const requestBody: CreateCostCenterRequestDto =
        this.costCenterMapper.toCreateRequest(costCenterDto);

      try {
        const createCostCenterResponse = await this.http.post<
          CreateCostCenterRequestDto,
          CsodCreatedResponseDto
        >(this.getUrl(), requestBody, csodToken);

        resultList.push(createCostCenterResponse);
      } catch (error) {
        // TODO: Implement proper logging
      }
    }

    return {
      status: HttpStatus.OK,
      data: resultList,
    };
  }

  // TODO: MAP COST CENTER ENTITY
  async findAll(
    queryParamsDto: QueryParamsDto,
  ): Promise<IServiceResponse<unknown>> {
    const csodToken = await this.authService.getToken();

    const costCenterResponse = await this.http.get<unknown>(
      this.getUrl(),
      queryParamsDto,
      csodToken,
    );

    return {
      status: HttpStatus.OK,
      data: costCenterResponse,
    };
  }

  // TODO: Implement update method with PUT when ready
  update(id: number, updateCostCenterDto: unknown) {
    return `This action updates cost center #${id}`;
  }

  private getUrl(): URL {
    const { csodBaseUrl } = this.configService.getOrThrow<TCsodeAccess>(
      ConfigKeys.CORNERSTONE,
    );
    return new URL(`${csodBaseUrl}${OusIntegrationRoutes.ORGANIZATIONS}`);
  }
}
