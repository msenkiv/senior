import { Injectable } from '@nestjs/common';
import { CreateDivisionDto } from '../dtos/create-division.dto';
import { CreateDivisionRequestDto } from '../dtos/create-division-request.dto';
import { DIVISION_TYPE_ID } from '@/shared/enums/shared.enums';

@Injectable()
export class DivisionMapper {
  toCreateRequest(
    createDivisionDto: CreateDivisionDto,
  ): CreateDivisionRequestDto {
    return {
      active: createDivisionDto.status,
      customFields: [],
      description: createDivisionDto.owner ?? null,
      externalId: createDivisionDto.code,
      name: createDivisionDto.name,
      ownerId: 1,
      parentId: createDivisionDto.parent?.code
        ? Number(createDivisionDto.parent.code)
        : 0,
      reconcilable: createDivisionDto.reconcilable,
      typeId: DIVISION_TYPE_ID,
    };
  }
}
