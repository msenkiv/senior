import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import { CreateCompanyRequestDto } from '../dtos/create-company-resquest.dto';
import { OusTypeId } from '@/shared/enums/shared.enums';

@Injectable()
export class CompanyMapper {
  toCreateRequest(createCompanyDto: CreateCompanyDto): CreateCompanyRequestDto {
    return {
      active: createCompanyDto.status,
      customFields: [],
      description: createCompanyDto.property ?? null,
      externalId: createCompanyDto.code,
      name: createCompanyDto.name,
      ownerId: 1,
      parentId: createCompanyDto.superior?.code
        ? Number(createCompanyDto.superior.code)
        : 0,
      reconcilable: createCompanyDto.conciled,
      typeId: OusTypeId.COMPANY,
    };
  }
}
