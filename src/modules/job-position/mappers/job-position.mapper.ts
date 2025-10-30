import { Injectable } from '@nestjs/common';
import { CreateJobPositionDto } from '../dtos/create-job-position.dto';
import { CreateJobPositionRequestDto } from '../dtos/create-job-position-request.dto';
import { JOB_POSITION_TYPE_ID } from '@/shared/enums/shared.enums';

@Injectable()
export class JobPositionMapper {
  toCreateRequest(
    createJobPositionDto: CreateJobPositionDto,
  ): CreateJobPositionRequestDto {
    return {
      active: createJobPositionDto.status,
      customFields: [null],
      description: createJobPositionDto.owner ?? null,
      externalId: createJobPositionDto.code,
      name: createJobPositionDto.name,
      ownerId: 1,
      parentId: createJobPositionDto.parent?.code
        ? Number(createJobPositionDto.parent.code)
        : 0,
      reconcilable: createJobPositionDto.reconcilable,
      typeId: JOB_POSITION_TYPE_ID,
    };
  }
}
