import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class SuperiorDto {
  @IsOptional()
  @IsString()
  code: string | null;
}

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsOptional()
  @IsString()
  property?: string;

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
