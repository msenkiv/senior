import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OusTypeId } from '@/shared/enums/shared.enums';

class AddressDto {
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  line1?: string;

  @IsOptional()
  @IsString()
  line2?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  zipCode?: string;
}

class CustomFieldDto {
  @IsNumber()
  id: number;

  @IsOptional()
  value?: unknown;
}

class OrganizationalUnitDto {
  @IsString()
  id: string;

  @IsNumber()
  typeId: OusTypeId;
}

class RelationDto {
  @IsString()
  id: string;

  @IsNumber()
  typeId: number;
}

class SettingsDto {
  @IsOptional()
  @IsString()
  displayLanguage?: string;

  @IsOptional()
  @IsString()
  timeZone?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  trainingApprovals?: number;
}

class WorkerStatusDto {
  @IsBoolean()
  absent: boolean;

  @IsBoolean()
  active: boolean;

  @IsOptional()
  @IsDateString()
  lastHireDate?: string;

  @IsOptional()
  @IsDateString()
  originalHireDate?: string;
}

export class CreateEmployeeRequestDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;

  @Type(() => Number)
  @IsNumber()
  approverId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomFieldDto)
  customFields: CustomFieldDto[];

  @IsString()
  @IsNotEmpty()
  externalId: string;

  @IsOptional()
  @IsString()
  fax?: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsOptional()
  @IsString()
  homePhone?: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  managerId?: number;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsOptional()
  @IsString()
  mobilePhone?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrganizationalUnitDto)
  ous: OrganizationalUnitDto[];

  @IsOptional()
  @IsEmail()
  personalEmail?: string;

  @IsOptional()
  @IsString()
  prefix?: string;

  @IsEmail()
  primaryEmail: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RelationDto)
  relations: RelationDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => SettingsDto)
  settings?: SettingsDto;

  @IsOptional()
  @IsString()
  suffix?: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsOptional()
  @IsString()
  workPhone?: string;

  @ValidateNested()
  @Type(() => WorkerStatusDto)
  workerStatus: WorkerStatusDto;
}
