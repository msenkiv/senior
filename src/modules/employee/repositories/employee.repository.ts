import { Injectable } from '@nestjs/common';
import { IEmployee } from '../interfaces/employee.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';

@Injectable()
export class EmployeeRepository implements IEmployee {
  @InjectRepository(Employee)
  private readonly employeeRepository: Repository<Employee>;

  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }
}
