import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { JOB_POSITION_TYPE_ID } from '@/shared/enums/shared.enums';

export class CreateJobPositionRequestDto {
  @IsBoolean()
  active: boolean;

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
  typeId: number = JOB_POSITION_TYPE_ID;
}
