import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationDto } from './create-organization.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  description?: string;
}
