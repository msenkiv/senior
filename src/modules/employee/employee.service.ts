import {
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { IEmployee } from './interfaces/employee.interface';
import { IServiceResponse } from '@/interfaces/senior-microservice.interface';
import { EmployeeDto } from './dtos/employee.dto';
import { TypeORMError } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class EmployeeService {
  private readonly logger = new Logger(EmployeeService.name);

  @Inject('IEmployee')
  private readonly employeeRepository: IEmployee;

  async findAll(): Promise<IServiceResponse<EmployeeDto[]>> {
    try {
      const employees = await this.employeeRepository.findAll();
      const employeeDto = plainToInstance(EmployeeDto, employees, {
        excludeExtraneousValues: true,
      });

      return {
        status: HttpStatus.OK,
        data: employeeDto,
      };
    } catch (error) {
      this.logger.error(
        'Erro na busca dos Funcionário na view do Senior.',
        error instanceof Error ? error.message : undefined,
        error,
      );

      if (error instanceof Error) {
        throw error;
      }

      if (error instanceof TypeORMError) {
        throw new InternalServerErrorException(
          'Erro ao acessar a camada de dados.',
        );
      }

      throw new InternalServerErrorException(
        'Erro interno na busca dos funcionário.',
      );
    }
  }
}
