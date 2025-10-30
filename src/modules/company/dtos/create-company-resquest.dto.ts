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

class CustomFieldDto {
  @IsNumber()
  id: number;

  @IsString()
  value: string;
}

export class CreateCompanyRequestDto {
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
  typeId: OusTypeId = OusTypeId.COMPANY;
}
