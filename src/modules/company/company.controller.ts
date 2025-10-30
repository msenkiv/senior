import { Body, Controller, Inject, ParseArrayPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './company/dtos/create-company.dto';
import {
  NATS_CREATE_COMPANY_SENIOR_CSOD,
  NATS_READ_COMPANIES_SENIOR_CSOD,
} from '@/utils/constants/shared.constants';
import { QueryParamsDto } from '../shared/query-params.dto';

@Controller()
export class CompanyController {
  @Inject(CompanyService)
  private readonly companyService: CompanyService;

  @MessagePattern(NATS_CREATE_COMPANY_SENIOR_CSOD)
  create(
    @Body(new ParseArrayPipe({ items: CreateCompanyDto }))
    createCompanyDto: CreateCompanyDto[],
  ) {
    return this.companyService.create(createCompanyDto);
  }

  @MessagePattern(NATS_READ_COsMPANIES_SENIOR_CSOD)
  async findAll(@Payload() queryParamsDto: QueryParamsDto) {
    return this.companyService.findALl(queryParamsDto);
  }
}
