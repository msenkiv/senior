import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class WorkerStatusDto {
  @IsBoolean()
  active: boolean;

  @IsBoolean()
  absent: boolean;
}

class RelationshipDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}

class OrganizationalUnitDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsOptional()
  @IsString()
  guid?: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsDateString()
  hireDate: string;

  @ValidateNested()
  @Type(() => WorkerStatusDto)
  workerStatus: WorkerStatusDto;

  @IsString()
  @IsOptional()
  cpf?: string;

  @IsString()
  @IsOptional()
  rg?: string;

  @IsString()
  @IsOptional()
  badge?: string;

  @IsOptional()
  @IsString()
  contractEndDate?: string;

  @IsBoolean()
  hazardousWork: boolean;

  @IsBoolean()
  unhealthyWork: boolean;

  @Type(() => Number)
  @IsNumber()
  trainingApproval: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  supervisorId?: number;

  @IsString()
  @IsOptional()
  board?: string;

  @ValidateNested()
  @Type(() => RelationshipDto)
  relation: RelationshipDto;

  @ValidateNested()
  @Type(() => OrganizationalUnitDto)
  division: OrganizationalUnitDto;

  @ValidateNested()
  @Type(() => OrganizationalUnitDto)
  location: OrganizationalUnitDto;

  @ValidateNested()
  @Type(() => OrganizationalUnitDto)
  position: OrganizationalUnitDto;

  @ValidateNested()
  @Type(() => OrganizationalUnitDto)
  costCenter: OrganizationalUnitDto;

  @ValidateNested()
  @Type(() => OrganizationalUnitDto)
  company: OrganizationalUnitDto;

  @ValidateNested()
  @Type(() => RelationshipDto)
  union: RelationshipDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RelationshipDto)
  businessPartner?: RelationshipDto;
}
