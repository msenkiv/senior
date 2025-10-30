import { Type } from 'class-transformer';
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

class EmployeeAddressDto {
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

class EmployeeCustomFieldDto {
  @IsNumber()
  id: number;

  @IsOptional()
  value?: unknown;
}

class EmployeeOrganizationalUnitDto {
  @IsString()
  id: string;

  @IsNumber()
  typeId: number;
}

class EmployeeRelationDto {
  @IsString()
  id: string;

  @IsNumber()
  typeId: number;
}

class EmployeeSettingsDto {
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

class EmployeeWorkerStatusDto {
  @IsOptional()
  @IsBoolean()
  absent?: boolean;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsDateString()
  lastHireDate?: string;

  @IsOptional()
  @IsDateString()
  originalHireDate?: string;
}

export class EmployeeResponseDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => EmployeeAddressDto)
  address?: EmployeeAddressDto;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  approverId?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmployeeCustomFieldDto)
  customFields?: EmployeeCustomFieldDto[];

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

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmployeeOrganizationalUnitDto)
  ous?: EmployeeOrganizationalUnitDto[];

  @IsOptional()
  @IsEmail()
  personalEmail?: string;

  @IsOptional()
  @IsString()
  prefix?: string;

  @IsEmail()
  primaryEmail: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmployeeRelationDto)
  relations?: EmployeeRelationDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => EmployeeSettingsDto)
  settings?: EmployeeSettingsDto;

  @IsOptional()
  @IsString()
  suffix?: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsOptional()
  @IsString()
  workPhone?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => EmployeeWorkerStatusDto)
  workerStatus?: EmployeeWorkerStatusDto;
}

export class AllEmployeesDto {
  @IsString()
  @IsNotEmpty()
  timestamp: string;

  @IsNumber()
  @IsNotEmpty()
  pageNumber: number;

  @IsNumber()
  @IsNotEmpty()
  count: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmployeeResponseDto)
  data: EmployeeResponseDto[];
}
