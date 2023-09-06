import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TribeService } from './tribe.service';
import { GetRepositoryMetricsQueryDto } from './dto/get-repository-metrics-query.dto';
import { Response } from 'express';

@ApiTags('tribes')
@Controller('tribes')
export class TribeController {
  constructor(private readonly tribeService: TribeService) {}

  @Get(':id/metrics')
  @ApiOperation({ summary: "Get metrics of tribe's repositories" })
  @ApiResponse({ status: 200, description: "Metrics of tribe's repositories" })
  getRepositoryMetrics(
    @Param('id') id: string,
    @Query() query: GetRepositoryMetricsQueryDto,
  ): Promise<any> {
    return this.tribeService.getRepositoryMetrics(+id, query);
  }

  @Get(':id/metrics/report')
  @ApiOperation({
    summary: "Generate report about metrics of tribe's repositories",
  })
  @ApiResponse({ status: 200, description: 'CSV File' })
  async getRepositoryMetricsReport(
    @Param('id') id: string,
    @Query() query: GetRepositoryMetricsQueryDto,
    @Res() res: Response,
  ): Promise<any> {
    const csvData = await this.tribeService.generateRepositoryMetricsReport(
      +id,
      query,
    );

    // Set response headers for CSV download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=data.csv');
    res.send(csvData);
  }
}
