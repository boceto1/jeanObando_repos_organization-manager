import { Module } from '@nestjs/common';
import { TribeService } from './tribe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tribe } from './entities/tribe.entity';
import { TribeController } from './tribe.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tribe])],
  providers: [TribeService],
  controllers: [TribeController],
  exports: [TribeService],
})
export class TribeModule {}
