import { type HttpStatus } from '@nestjs/common';

export interface IServiceResponse<TData = unknown> {
  status: HttpStatus;
  data?: TData;
  errors?: string[];
}
