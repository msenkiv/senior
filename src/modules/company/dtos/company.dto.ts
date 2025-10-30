import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CompanyDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  externalId: string;

  @IsNumber()
  @IsNotEmpty()
  typeId: number;

  @IsOptional()
  @IsNumber()
  ownerId?: number | null;

  @IsOptional()
  @IsString()
  description?: string | null;

  @IsNumber()
  @IsNotEmpty()
  parentId: number;

  @IsBoolean()
  @IsNotEmpty()
  reconcilable: boolean;
}

export class AllCompaniesDto {
  @IsString()
  @IsNotEmpty()
  timestamp: string;

  @IsNumber()
  @IsNotEmpty()
  pageNumber: number;

  @IsNumber()
  @IsNotEmpty()
  count: number;

  @Type(() => CompanyDto)
  data: CompanyDto[];
}
