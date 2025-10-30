import { IsNotEmpty, IsString } from 'class-validator';

export class CsodCredentialsDto {
  @IsNotEmpty()
  @IsString()
  clientId: string;

  @IsNotEmpty()
  @IsString()
  clientSecret: string;

  @IsNotEmpty()
  @IsString()
  grantType: string;

  @IsNotEmpty()
  @IsString()
  scope: string;
}
