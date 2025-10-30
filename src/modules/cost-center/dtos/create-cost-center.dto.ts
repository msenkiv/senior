import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class SuperiorDto {
  @IsNotEmpty()
  @IsString()
  code: string;
}

export class CreateCostCenterDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsOptional()
  @IsString()
  owner?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsBoolean()
  status: boolean;

  @IsBoolean()
  conciled: boolean;

  @ValidateNested()
  @Type(() => SuperiorDto)
  superior: SuperiorDto;
}
