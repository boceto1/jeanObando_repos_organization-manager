import { Module } from '@nestjs/common';
import { MockApiModule } from './mock-api/mock-api.module';
import { MockApiController } from './mock-api/mock-api.controller';
import { MockApiService } from './mock-api/mock-api.service';
import { OrganizationModule } from './organization/organization.module';

@Module({
  imports: [MockApiModule, OrganizationModule],
  controllers: [MockApiController],
  providers: [MockApiService],
})
export class AppModule {}
