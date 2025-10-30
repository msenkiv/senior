import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { NATSConfig } from '@configs/nats.config';
import { validate } from './env.validation';
import environment from '@configs/env-register.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from '@configs/database.config';
import { EmployeeModule } from './modules/employee/employee.module';
import { SharedModule } from './shared/shared.module';
import { OusModule } from '@modules/csod/ous/ous.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      load: [...environment],
    }),
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: 'NATS_CLIENT',
          imports: [ConfigModule],
          useClass: NATSConfig,
        },
      ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfigService,
    }),
    EmployeeModule,
    SharedModule,
    OusModule,
  ],
})
export class AppModule {}
