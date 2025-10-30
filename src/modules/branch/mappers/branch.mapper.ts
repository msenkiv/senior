import { Injectable } from '@nestjs/common';
import { CreateBranchDto } from '../dtos/create-branch.dto';
import { CreateBranchRequestDto } from '../dtos/create-branch-request.dto';
import { OusTypeId } from '@/shared/enums/shared.enums';

@Injectable()
export class BranchMapper {
  toCreateRequest(createBranchDto: CreateBranchDto): CreateBranchRequestDto {
    return {
      active: createBranchDto.status,
      customFields: [],
      description: createBranchDto.owner ?? null,
      externalId: createBranchDto.code,
      name: createBranchDto.name,
      ownerId: 1,
      parentId: createBranchDto.superior?.code
        ? Number(createBranchDto.superior.code)
        : 0,
      reconcilable: createBranchDto.conciled,
      typeId: OusTypeId.BRANCH,
    };
  }
}
