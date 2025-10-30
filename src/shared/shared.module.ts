import { Module } from '@nestjs/common';
import { HttpIntegrationService } from './services/http-integration.service';

@Module({
  providers: [HttpIntegrationService],
})
export class SharedModule {}
