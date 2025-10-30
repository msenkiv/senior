import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { HttpIntegrationService } from '@/shared/services/http-integration.service';
import { CsodAuthModule } from '../auth/auth.module';

@Module({
  imports: [CsodAuthModule],
  controllers: [CompanyController],
  providers: [CompanyService, HttpIntegrationService],
  exports: [CompanyService],
})
export class CompanyModule {}
