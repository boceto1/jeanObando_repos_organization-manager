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

export const REPOSITORY_CLIENT_STATE = {
  E: 'Enable',
  D: 'Disable',
  A: 'Archived',
} as const;

export type REPOSITORY_CLIENT_STATE =
  (typeof REPOSITORY_STATE)[keyof typeof REPOSITORY_STATE];

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
  @IsEnum(REPOSITORY_CLIENT_STATE)
  readonly state: REPOSITORY_CLIENT_STATE;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  readonly minCoverage: number;
}
