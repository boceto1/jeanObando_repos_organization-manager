import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OKResult } from 'src/utils/types';
import { Organization } from './entities/organization.entity';

@ApiTags('organizations')
@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new organization' })
  @ApiResponse({ status: 201, description: 'Created' })
  create(
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Promise<OKResult> {
    return this.organizationService.create(createOrganizationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all organizations' })
  @ApiResponse({ status: 200, description: 'List of organizations' })
  findAll(): Promise<Organization[]> {
    return this.organizationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one organization' })
  @ApiResponse({ status: 200, description: 'Found organization' })
  findOne(@Param('id') id: string): Promise<Organization> {
    return this.organizationService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update one organizations' })
  @ApiResponse({ status: 200, description: 'Ok' })
  update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<OKResult> {
    return this.organizationService.update(+id, updateOrganizationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete one organizations' })
  @ApiResponse({ status: 200, description: 'List of organizations' })
  remove(@Param('id') id: string): Promise<Organization[]> {
    return this.organizationService.remove(+id);
  }
}
