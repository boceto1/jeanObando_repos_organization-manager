import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export const REPOSITORY_STATE = {
  Enable: 'E',
  Disable: 'D',
  Archived: 'A',
} as const;
export type REPOSITORY_STATE = keyof typeof REPOSITORY_STATE;

export const RepositoryClientStateEnum = {
  E: 'Enable',
  D: 'Disable',
  A: 'Archived',
} as const;

export type RepositoryClientStateEnum =
  (typeof RepositoryClientStateEnum)[keyof typeof RepositoryClientStateEnum];

export const FilterByEnum = {
  DATE: 'from',
  STATE: 'state',
  COVERAGE: 'minCoverage',
} as const;
export type FilterByEnum = (typeof FilterByEnum)[keyof typeof FilterByEnum];

export class GetRepositoryMetricsQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  readonly from?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(RepositoryClientStateEnum)
  readonly state?: RepositoryClientStateEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  readonly minCoverage?: number;
}
