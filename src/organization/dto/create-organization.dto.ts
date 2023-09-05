import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20, { message: 'Name is too long' })
  readonly name: string;

  @IsNumber()
  readonly status: number;
}
