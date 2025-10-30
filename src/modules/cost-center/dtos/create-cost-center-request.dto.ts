import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OusTypeId } from '@/shared/enums/shared.enums';

class CostCenterDetailsDto {
  @IsNumber()
  approverId: number;
}

export class CreateCostCenterRequestDto {
  @IsBoolean()
  active: boolean;

  @ValidateNested()
  @Type(() => CostCenterDetailsDto)
  costcenterDetails: CostCenterDetailsDto;

  @IsArray()
  @IsOptional()
  customFields?: (string | null)[];

  @IsString()
  @IsOptional()
  description?: string | null;

  @IsString()
  @IsNotEmpty()
  externalId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  ownerId: number;

  @IsNumber()
  parentId: number;

  @IsBoolean()
  reconcilable: boolean;

  @IsNumber()
  typeId: OusTypeId;
}
