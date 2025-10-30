import { IServiceResponse } from '@/interfaces/senior-microservice.interface';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { NatsContext, RpcException } from '@nestjs/microservices';
import { throwError } from 'rxjs';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToRpc().getContext<NatsContext>();

    const subject = ctx.getSubject() || 'unknown';
    let typeError = 'UnknownTypeError';
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const messages: string[] = [];

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      typeError = exception.name;
      const response = exception.getResponse();
      this.extractMessage(response).forEach((message) => {
        messages.push(message);
      });
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      messages.push('Erro interno no microsserviço.');
    }

    if (messages.length === 0) {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      messages.push('Erro interno no microsserviço.');
    }

    const response: IServiceResponse = {
      status: statusCode,
      errors: messages,
    };

    this.logger.warn(
      'Sending error back to client request',
      `Subject: ${subject} || Status Code: ${statusCode} || Type Error: ${typeError}.`,
      `Exception (Original): ${JSON.stringify(exception)}`,
    );

    return throwError(() => new RpcException(response));
  }

  private extractMessage(error: unknown): string[] {
    if (typeof error === 'object' && error !== null && 'message' in error) {
      const { message } = error as { message: string | string[] };
      return Array.isArray(message) ? message.map(String) : [String(message)];
    }
    if (typeof error === 'string') {
      return [error];
    }
    // Se for um Error padrão, mas sem 'message' (improvável, mas seguro)
    if (error instanceof Error && error.message) {
      return [error.message];
    }

    return [];
  }
}
