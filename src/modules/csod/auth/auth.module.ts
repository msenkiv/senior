import { Module } from '@nestjs/common';
import { CsodAuthenticationService } from './auth.service';

@Module({
  providers: [CsodAuthenticationService],
  exports: [CsodAuthenticationService],
})
export class CsodAuthModule {}
