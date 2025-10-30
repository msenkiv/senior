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
import { DIVISION_TYPE_ID } from '@/shared/enums/shared.enums';

class CustomFieldDto {
  @IsNumber()
  id: number;

  @IsString()
  value: string;
}

export class CreateDivisionRequestDto {
  @IsBoolean()
  active: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomFieldDto)
  customFields: CustomFieldDto[];

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
  typeId: number = DIVISION_TYPE_ID;
}
