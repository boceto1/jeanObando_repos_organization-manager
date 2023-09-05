import { Module } from '@nestjs/common';
import { MockApiModule } from './mock-api/mock-api.module';
import { MockApiController } from './mock-api/mock-api.controller';
import { MockApiService } from './mock-api/mock-api.service';

@Module({
  imports: [MockApiModule],
  controllers: [MockApiController],
  providers: [MockApiService],
})
export class AppModule {}
