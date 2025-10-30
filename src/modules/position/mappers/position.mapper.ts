import { Injectable } from '@nestjs/common';
import { CreatePositionDto } from '../dtos/create-position.dto';
import { CreatePositionRequestDto } from '../dtos/create-position-request.dto';
import { OusTypeId } from '@/shared/enums/shared.enums';

@Injectable()
export class PositionMapper {
  toCreateRequest(
    createPositionDto: CreatePositionDto,
  ): CreatePositionRequestDto {
    return {
      active: createPositionDto.status,
      customFields: [
        {
          id: 17,
          value: 'Yes',
        },
      ],
      description: createPositionDto.owner ?? null,
      externalId: createPositionDto.code,
      name: createPositionDto.name,
      ownerId: 1,
      parentId: createPositionDto.parent?.code
        ? Number(createPositionDto.parent.code)
        : 0,
      positionDetails: {
        successionOwnerId: 0,
      },
      reconcilable: createPositionDto.reconcilable,
      typeId: OusTypeId.POSITION,
    };
  }
}
