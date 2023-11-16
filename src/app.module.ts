import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MockApiModule } from './mock-api/mock-api.module';
import { MockApiController } from './mock-api/mock-api.controller';
import { MockApiService } from './mock-api/mock-api.service';
import { OrganizationModule } from './organization/organization.module';
import { TribeModule } from './tribe/tribe.module';
import { DB_OPTIONS } from './typeorm.config';
import { RepositoryModule } from './repository/repository.module';
import { MetricsModule } from './metrics/metrics.module';
import { ThirdPartyValidatorModule } from './third-party-validator/third-party-validator.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

ConfigModule.forRoot({
  envFilePath: '../.env',
});

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...DB_OPTIONS }),
    MockApiModule,
    OrganizationModule,
    TribeModule,
    RepositoryModule,
    MetricsModule,
    ThirdPartyValidatorModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [MockApiController],
  providers: [MockApiService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
