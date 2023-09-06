import { Module } from '@nestjs/common';
import { ThirdPartyValidatorService } from './third-party-validator.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ThirdPartyValidatorService],
  exports: [ThirdPartyValidatorService],
})
export class ThirdPartyValidatorModule {}
