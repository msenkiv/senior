import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from '../dtos/create-employee.dto';
import { CreateEmployeeRequestDto } from '../dtos/create-employee-request.dto';
import {
  DIVISION_TYPE_ID,
  JOB_POSITION_TYPE_ID,
  LOCATION_TYPE_ID,
  OusTypeId,
} from '@/shared/enums/shared.enums';

interface IOrganizationalUnitMapping {
  id: string;
  type: string;
}

@Injectable()
export class EmployeeMapper {
  private readonly organizationalUnitTypeMap = new Map<string, number>([
    ['company', OusTypeId.COMPANY],
    ['division', DIVISION_TYPE_ID],
    ['location', LOCATION_TYPE_ID],
    ['position', OusTypeId.POSITION],
    ['job position', JOB_POSITION_TYPE_ID],
    ['cost center', OusTypeId.COST_CENTER],
  ]);

  private readonly relationTypeMap = new Map<string, number>([
    ['bp', 0],
    ['union', 0],
    ['business partner rh', 0],
  ]);

  toCreateRequest(
    createEmployeeDto: CreateEmployeeDto,
  ): CreateEmployeeRequestDto {
    const approverId = this.getSupervisorId(createEmployeeDto);
    const ous = this.mapOrganizationalUnits(createEmployeeDto);
    const relations = this.mapRelations(createEmployeeDto);

    const primaryEmail =
      createEmployeeDto.email ??
      `${createEmployeeDto.username}@placeholder.local`;

    return {
      approverId,
      customFields: [],
      externalId: createEmployeeDto.employeeId,
      fax: undefined,
      firstName: createEmployeeDto.firstName,
      homePhone: undefined,
      lastName: createEmployeeDto.lastName,
      managerId: approverId,
      middleName: this.extractMiddleName(createEmployeeDto),
      mobilePhone: undefined,
      ous,
      personalEmail: undefined,
      prefix: undefined,
      primaryEmail,
      relations,
      settings: {
        trainingApprovals: createEmployeeDto.trainingApproval,
      },
      suffix: undefined,
      userName: createEmployeeDto.username,
      workPhone: undefined,
      workerStatus: {
        absent: createEmployeeDto.workerStatus.absent,
        active: createEmployeeDto.workerStatus.active,
        lastHireDate: createEmployeeDto.hireDate,
        originalHireDate: createEmployeeDto.hireDate,
      },
    };
  }

  private getSupervisorId(createEmployeeDto: CreateEmployeeDto): number {
    if (createEmployeeDto.supervisorId) {
      return Number(createEmployeeDto.supervisorId);
    }

    return 0;
  }

  private mapOrganizationalUnits(
    createEmployeeDto: CreateEmployeeDto,
  ): CreateEmployeeRequestDto['ous'] {
    const organizationalUnits: IOrganizationalUnitMapping[] = [
      createEmployeeDto.company,
      createEmployeeDto.costCenter,
      createEmployeeDto.division,
      createEmployeeDto.location,
      createEmployeeDto.position,
    ];

    return organizationalUnits
      .filter((unit): unit is IOrganizationalUnitMapping => Boolean(unit?.id))
      .map((unit) => {
        const typeId = this.organizationalUnitTypeMap.get(
          unit.type.toLowerCase(),
        );

        return {
          id: unit.id,
          typeId: typeId ?? OusTypeId.COMPANY,
        };
      });
  }

  private mapRelations(
    createEmployeeDto: CreateEmployeeDto,
  ): CreateEmployeeRequestDto['relations'] {
    const relations = [
      createEmployeeDto.relation,
      createEmployeeDto.union,
      createEmployeeDto.businessPartner,
    ].filter((relation): relation is NonNullable<typeof relation> =>
      Boolean(relation),
    );

    return relations.map((relation) => {
      const typeId = this.relationTypeMap.get(relation.type.toLowerCase()) ?? 0;

      return {
        id: relation.id,
        typeId,
      };
    });
  }

  private extractMiddleName(
    createEmployeeDto: CreateEmployeeDto,
  ): string | undefined {
    if (!createEmployeeDto.fullName) {
      return undefined;
    }

    const nameParts = createEmployeeDto.fullName.trim().split(/\s+/);

    if (nameParts.length <= 2) {
      return undefined;
    }

    nameParts.shift();
    const lastNameParts = createEmployeeDto.lastName.trim().split(/\s+/);

    for (const lastNamePart of lastNameParts) {
      if (lastNamePart) {
        nameParts.pop();
      }
    }

    const middleName = nameParts.join(' ').trim();

    return middleName.length > 0 ? middleName : undefined;
  }
}
