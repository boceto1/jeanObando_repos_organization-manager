import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TribeService } from './tribe.service';
import { GetRepositoryMetricsQueryDto } from './dto/get-repository-metrics-query.dto';

@ApiTags('tribes')
@Controller('tribes')
export class TribeController {
  constructor(private readonly tribeService: TribeService) {}

  @Get(':id/metrics')
  @ApiOperation({ summary: "Get metrics of tribe's repositories" })
  @ApiResponse({ status: 200, description: 'Found organization' })
  getRepositoryMetrics(
    @Param('id') id: string,
    @Query() query: GetRepositoryMetricsQueryDto,
  ): Promise<any> {
    return this.tribeService.getRepositoryMetrics(+id, query);
  }
}
