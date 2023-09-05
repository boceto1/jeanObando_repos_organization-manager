import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({
    example: 'org 1',
    description: 'The name of the Organization',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20, { message: 'Name is too long' })
  readonly name: string;

  @ApiProperty({
    example: 1,
    description: 'The status of the Organization',
  })
  @IsNumber()
  readonly status: number;
}
