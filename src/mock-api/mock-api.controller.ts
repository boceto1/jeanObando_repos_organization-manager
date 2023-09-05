import { Controller, Get, Param } from '@nestjs/common';
import { MockApiService } from './mock-api.service';

@Controller('mock-api')
export class MockApiController {
  constructor(private readonly mockApiService: MockApiService) {}

  @Get(':id')
  findVerificationStatus(@Param('id') id: string) {
    return this.mockApiService.getVerificationStatus(+id);
  }
}
