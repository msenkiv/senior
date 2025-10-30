import { IsNotEmpty, IsString } from 'class-validator';

export class CsodCredentialsDto {
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsString()
  @IsNotEmpty()
  clientSecret: string;

  @IsString()
  @IsNotEmpty()
  grantType: string;

  @IsString()
  @IsNotEmpty()
  scope: string;
}
