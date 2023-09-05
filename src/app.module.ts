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

ConfigModule.forRoot({
  envFilePath: '../.env',
});

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...DB_OPTIONS }),
    MockApiModule,
    OrganizationModule,
    TribeModule,
  ],
  controllers: [MockApiController],
  providers: [MockApiService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
