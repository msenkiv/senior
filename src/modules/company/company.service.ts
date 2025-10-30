import { HttpIntegrationService } from '@/shared/services/http-integration.service';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IServiceResponse } from '@/interfaces/senior-microservice.interface';
import { ConfigKeys, TCsodeAccess } from '@configs/env-register.config';
import { ConfigService } from '@nestjs/config';
import { OusIntegrationRoutes } from '../../../shared/enums/routes.enum';
import { CsodAuthenticationService } from '../auth/auth.service';
import { CreateCompanyDto } from './company/dtos/create-company.dto';
import { CompanyMapper } from './company/mappers/company.mapper';
import { CreateCompanyRequestDto } from './company/dtos/create-company-resquest.dto';
import { CsodCreatedResponseDto } from '../../../shared/dtos/created-response.dto';
import { QueryParamsDto } from '../shared/query-params.dto';
import { AllCompaniesDto } from './company/dtos/company.dto';

@Injectable()
export class CompanyService {
  @Inject(ConfigService)
  private readonly configService: ConfigService;

  @Inject(HttpIntegrationService)
  private http: HttpIntegrationService;

  @Inject(CsodAuthenticationService)
  private authService: CsodAuthenticationService;

  @Inject(CompanyMapper)
  private companyMapper: CompanyMapper;

  async create(
    createCompanyListDto: CreateCompanyDto[],
  ): Promise<IServiceResponse<CsodCreatedResponseDto[]>> {
    const csodToken = await this.authService.getToken();

    const resultList: CsodCreatedResponseDto[] = [];

    for (const companyDto of createCompanyListDto) {
      const requestBody: CreateCompanyRequestDto =
        this.companyMapper.toCreateRequest(companyDto);

      try {
        const createCompanyResponse = await this.http.post<
          CreateCompanyRequestDto,
          CsodCreatedResponseDto
        >(this.getUrl(), requestBody, csodToken);
        resultList.push(createCompanyResponse);
      } catch (error) {
        // TODO -> Implements LOGS
        // This.logger.error(
        //   `Erro ao criar empresa ${companyDto.name}: ${error.message}`,
        // );
        // Results.push({ error: error.message, company: companyDto.code });
      }
    }
    return {
      status: HttpStatus.OK,
      data: resultList,
    };
  }

  async findALl(
    queryParamsDto: QueryParamsDto,
  ): Promise<IServiceResponse<AllCompaniesDto>> {
    const csodToken = await this.authService.getToken();

    const response = await this.http.get<AllCompaniesDto>(
      this.getUrl(),
      queryParamsDto,
      csodToken,
    );

    return {
      status: HttpStatus.OK,
      data: response,
    };
  }

  private getUrl(): URL {
    const { csodBaseUrl } = this.configService.getOrThrow<TCsodeAccess>(
      ConfigKeys.CORNERSTONE,
    );
    return new URL(`${csodBaseUrl}${OusIntegrationRoutes.ORGANIZATIONS}`);
  }
}
