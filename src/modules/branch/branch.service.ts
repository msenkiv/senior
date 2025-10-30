import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dtos/create-branch.dto';
import { UpdateBranchDto } from './dtos/update-branch.dto';
import { CsodCreatedResponseDto } from '@/shared/dtos/created-response.dto';
import { IServiceResponse } from '@/interfaces/senior-microservice.interface';
import { ConfigService } from '@nestjs/config';
import { ConfigKeys, TCsodeAccess } from '@configs/env-register.config';
import { OusIntegrationRoutes } from '@/shared/enums/routes.enum';
import { CsodAuthenticationService } from '@modules/csod/auth/auth.service';
import { CreateBranchRequestDto } from './dtos/create-branch-request.dto';
import { BranchMapper } from './mappers/branch.mapper';
import { HttpIntegrationService } from '@/shared/services/http-integration.service';
import { QueryParamsDto } from '@modules/csod/shared/query-params.dto';

@Injectable()
export class BranchService {
  @Inject(ConfigService)
  private readonly configService: ConfigService;

  @Inject(CsodAuthenticationService)
  private authService: CsodAuthenticationService;

  @Inject(BranchMapper)
  private branchMapper: BranchMapper;

  @Inject(HttpIntegrationService)
  private http: HttpIntegrationService;

  async create(
    createBranchListDto: CreateBranchDto[],
  ): Promise<IServiceResponse<CsodCreatedResponseDto[]>> {
    const csodToken = await this.authService.getToken();

    const resultList: CsodCreatedResponseDto[] = [];

    for (const branchDto of createBranchListDto) {
      const requestBody: CreateBranchRequestDto =
        this.branchMapper.toCreateRequest(branchDto);

      try {
        const createBranchResponse = await this.http.post<
          CreateBranchRequestDto,
          CsodCreatedResponseDto
        >(this.getUrl(), requestBody, csodToken);

        resultList.push(createBranchResponse);
      } catch (error) {
        // Todo implement error
      }
    }
    return {
      status: HttpStatus.OK,
      data: resultList,
    };
  }

  // TODO MAP  BRANCH ENTITY
  async findALl(
    queryParamsDto: QueryParamsDto,
  ): Promise<IServiceResponse<unknown>> {
    const csodToken = await this.authService.getToken();

    const branchResponse = await this.http.get<unknown>(
      this.getUrl(),
      queryParamsDto,
      csodToken,
    );
    return {
      status: HttpStatus.OK,
      data: branchResponse,
    };
  }

  // TODO - UPDATE METHORD
  update(id: number, updateBranchDto: UpdateBranchDto) {
    return `This action updates a #${id} branch`;
  }

  private getUrl(): URL {
    const { csodBaseUrl } = this.configService.getOrThrow<TCsodeAccess>(
      ConfigKeys.CORNERSTONE,
    );
    return new URL(`${csodBaseUrl}${OusIntegrationRoutes.ORGANIZATIONS}`);
  }
}
