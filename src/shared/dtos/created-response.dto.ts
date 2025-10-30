import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CsodCreatedResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  link: string;

  @IsString()
  createdAt: string;

  @IsOptional()
  @IsString()
  message?: string | null;
}
