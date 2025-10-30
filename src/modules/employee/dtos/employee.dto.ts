import { Expose, Transform } from 'class-transformer';
import {
  OrganizationalUnitManager,
  PositionType,
} from '../enums/employee.enum';
import { IsDateString, IsEnum, IsNumber, IsString } from 'class-validator';

export class EmployeeDto {
  @Expose()
  @IsString()
  firstAndMiddleName: string;

  @Expose()
  @IsString()
  lastName: string;

  @Expose()
  @IsString()
  corporateEmail: string;

  @Expose()
  @IsNumber()
  legacyCompany: number;

  @Expose()
  @IsNumber()
  legacyBranch: number;

  @Expose()
  @IsNumber()
  legacyMatriculation: number;

  @Expose()
  @Transform(({ value }) => {
    if (!value) {
      return null;
    }

    if (value instanceof Date) {
      const year = String(value.getFullYear());
      const month = String(value.getMonth() + 1).padStart(2, '0');
      const day = String(value.getDate()).padStart(2, '0');

      return `${day}/${month}/${year}`;
    }

    return String(value);
  })
  @IsDateString()
  admissionDate: string;

  @Expose()
  @IsString()
  legacyOrganizationalUnitCode: string;

  @Expose()
  @IsString()
  legacyOrganizationalUnitText: string;

  @Expose()
  @IsEnum(PositionType, {
    message: `Cargo deve ser um dos seguintes valores: ${Object.values(PositionType).join(', ')}`,
  })
  positionType: string;

  @Expose()
  @IsEnum(OrganizationalUnitManager, {
    message: `Gerente de Unidade deve ser um dos seguintes valores: ${Object.values(OrganizationalUnitManager).join(', ')}`,
  })
  isOrganizationalUnitManager: string;

  @Expose()
  @IsString()
  higherOrganizationalUnitCode: string;

  @Expose()
  @IsString()
  higherOrganizationalUnitText: string;

  @Expose()
  @IsString()
  organizationalUnitRoot: string;
}
