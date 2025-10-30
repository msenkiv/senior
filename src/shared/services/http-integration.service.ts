import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IQueryParams } from '../interfaces/query-params.interface';

@Injectable()
export class HttpIntegrationService {
  private readonly logger = new Logger(HttpIntegrationService.name);

  @Inject(ConfigService)
  private readonly configService: ConfigService;

  async post<TData = unknown, TResponse = unknown>(
    url: URL,
    body: TData,
    token?: string,
  ): Promise<TResponse> {
    const headers = this.getHeader(token);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new HttpException(await response.text(), response.status);
      }

      return responseData as TResponse;
    } catch (error) {
      this.logger.error(
        `Integration error calling ${url.toString()}: ${
          error instanceof Error ? error.message : JSON.stringify(error)
        }`,
      );

      const status =
        typeof error === 'object' &&
        error !== null &&
        'status' in error &&
        typeof (error as Record<string, unknown>).status === 'number'
          ? (error as { status: number }).status
          : 500;

      throw new HttpException('Integration error', status);
    }
  }

  async get<TResponse = unknown>(
    url: URL,
    queryParams?: IQueryParams,
    token?: string,
  ): Promise<TResponse> {
    const headers = this.getHeader(token);

    if (queryParams) {
      url.search = this.buildQueryParams(queryParams);
    }

    try {
      const response = await fetch(url, { method: 'GET', headers });
      const responseData = await response.json();

      if (!response.ok) {
        throw new HttpException(await response.text(), response.status);
      }

      return responseData as TResponse;
    } catch (error) {
      this.handleError(url, error);
    }
  }

  private getHeader(token?: string): Headers {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  private buildQueryParams(queryParams: IQueryParams): string {
    const parts: string[] = [];

    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        parts.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
        );
      }
    });

    return parts.length ? `?${parts.join('&')}` : '';
  }

  private handleError(url: URL, error: unknown): never {
    this.logger.error(
      `Integration error calling ${url.toString()}: ${
        error instanceof Error ? error.message : JSON.stringify(error)
      }`,
    );

    const status =
      typeof error === 'object' &&
      error !== null &&
      'status' in error &&
      typeof (error as Record<string, unknown>).status === 'number'
        ? (error as { status: number }).status
        : 500;

    throw new HttpException('Integration error', status);
  }
}
