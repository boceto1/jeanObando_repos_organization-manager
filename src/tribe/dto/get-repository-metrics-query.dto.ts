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
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  readonly from: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(RepositoryClientStateEnum)
  readonly state: RepositoryClientStateEnum;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  readonly minCoverage: number;
}
