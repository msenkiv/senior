import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IServiceResponse } from '@/interfaces/senior-microservice.interface';
import { CsodCreatedResponseDto } from '@/shared/dtos/created-response.dto';
import { HttpIntegrationService } from '@/shared/services/http-integration.service';
import { ConfigKeys, TCsodeAccess } from '@configs/env-register.config';
import { CsodAuthenticationService } from '@modules/csod/auth/auth.service';
import { QueryParamsDto } from '@modules/csod/shared/query-params.dto';
import { ConfigService } from '@nestjs/config';
import { UsersIntegrationRoutes } from '@/shared/enums/routes.enum';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { CreateEmployeeRequestDto } from './dtos/create-employee-request.dto';
import { EmployeeMapper } from './mappers/employee.mapper';
import { AllEmployeesDto } from './dtos/employee-response.dto';

@Injectable()
export class EmployeeCsodService {
  @Inject(ConfigService)
  private readonly configService: ConfigService;

  @Inject(HttpIntegrationService)
  private http: HttpIntegrationService;

  @Inject(CsodAuthenticationService)
  private authService: CsodAuthenticationService;

  @Inject(EmployeeMapper)
  private employeeMapper: EmployeeMapper;

  async create(
    createEmployeeListDto: CreateEmployeeDto[],
  ): Promise<IServiceResponse<CsodCreatedResponseDto[]>> {
    const csodToken = await this.authService.getToken();

    const resultList: CsodCreatedResponseDto[] = [];

    for (const employeeDto of createEmployeeListDto) {
      const requestBody: CreateEmployeeRequestDto =
        this.employeeMapper.toCreateRequest(employeeDto);

      try {
        const createEmployeeResponse = await this.http.post<
          CreateEmployeeRequestDto,
          CsodCreatedResponseDto
        >(this.getUrl(), requestBody, csodToken);

        resultList.push(createEmployeeResponse);
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
  ): Promise<IServiceResponse<AllEmployeesDto>> {
    const csodToken = await this.authService.getToken();

    const employeesResponse = await this.http.get<AllEmployeesDto>(
      this.getUrl(),
      queryParamsDto,
      csodToken,
    );

    return {
      status: HttpStatus.OK,
      data: employeesResponse,
    };
  }

  private getUrl(): URL {
    const { csodBaseUrl } = this.configService.getOrThrow<TCsodeAccess>(
      ConfigKeys.CORNERSTONE,
    );

    return new URL(`${csodBaseUrl}${UsersIntegrationRoutes.EMPLOYEES}`);
  }
}
