import { Injectable } from '@nestjs/common';
import { CreateCostCenterDto } from '../dtos/create-cost-center.dto';
import { CreateCostCenterRequestDto } from '../dtos/create-cost-center-request.dto';
import { OusTypeId } from '@/shared/enums/shared.enums';

@Injectable()
export class CostCenterMapper {
  toCreateRequest(
    createCostCenterDto: CreateCostCenterDto,
  ): CreateCostCenterRequestDto {
    return {
      active: createCostCenterDto.status,
      costcenterDetails: {
        approverId: 0,
      },
      customFields: [null],
      description: createCostCenterDto.owner ?? null,
      externalId: createCostCenterDto.code,
      name: createCostCenterDto.name,
      ownerId: 1,
      parentId: createCostCenterDto.superior?.code
        ? Number(createCostCenterDto.superior.code)
        : 0,
      reconcilable: createCostCenterDto.conciled,
      typeId: OusTypeId.COST_CENTER,
    };
  }
}
