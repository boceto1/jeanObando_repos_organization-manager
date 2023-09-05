import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MockApiModule } from './mock-api/mock-api.module';
import { MockApiController } from './mock-api/mock-api.controller';
import { MockApiService } from './mock-api/mock-api.service';
import { OrganizationModule } from './organization/organization.module';

const ORM_MODULE = TypeOrmModule.forRoot({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '',
  database: 'organization-manager',
  entities: [],
  synchronize: true,
});

@Module({
  imports: [ORM_MODULE, MockApiModule, OrganizationModule],
  controllers: [MockApiController],
  providers: [MockApiService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
