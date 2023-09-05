import { Module } from '@nestjs/common';
import { TribeService } from './tribe.service';

@Module({
  providers: [TribeService],
  exports: [TribeService],
})
export class TribeModule {}
