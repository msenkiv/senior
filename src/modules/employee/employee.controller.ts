import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EmployeeService } from './employee.service';
import { NATS_READ_EMPLOYEES_SENIOR } from './constants/employee.constant';

@Controller()
export class EmployeeController {
  @Inject(EmployeeService)
  private readonly employeeService: EmployeeService;

  @MessagePattern(NATS_READ_EMPLOYEES_SENIOR)
  findAll() {
    return this.employeeService.findAll();
  }
}
