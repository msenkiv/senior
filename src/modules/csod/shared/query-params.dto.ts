import { IQueryParams } from '@/shared/interfaces/query-params.interface';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryParamsDto implements IQueryParams {
  [key: string]: string | number | boolean | undefined;

  @IsOptional()
  @IsString()
  externalId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  typeId?: number;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  includeInactive?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  name?: string;
}
