import { type Employee } from '../entities/employee.entity';

export interface IEmployee {
  findAll(): Promise<Employee[]>;
}
