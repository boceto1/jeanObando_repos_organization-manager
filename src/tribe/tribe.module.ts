import { Module } from '@nestjs/common';
import { TribeService } from './tribe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tribe } from './entities/tribe.entity';
import { TribeController } from './tribe.controller';
import { ThirdPartyValidatorModule } from 'src/third-party-validator/third-party-validator.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tribe]), ThirdPartyValidatorModule],
  providers: [TribeService],
  controllers: [TribeController],
  exports: [TribeService],
})
export class TribeModule {}
