import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ParentDto {
  @IsOptional()
  @IsString()
  code?: string | null;
}

export class CreateJobPositionDto {
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
  reconcilable: boolean;

  @ValidateNested()
  @Type(() => ParentDto)
  parent: ParentDto;
}
