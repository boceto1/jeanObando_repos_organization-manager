import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tribe } from './entities/tribe.entity';
import { ThirdPartyValidatorService } from 'src/third-party-validator/third-party-validator.service';

@Injectable()
export class TribeService {
  constructor(
    @InjectRepository(Tribe)
    private tribeRepository: Repository<Tribe>,
    private thirdPartyValidatorService: ThirdPartyValidatorService,
  ) {}

  async getRepositoryMetrics(id: number): Promise<any> {
    const repository = await this.tribeRepository.findOne({
      where: { idTribe: id },
      relations: {
        organization: true,
        repositories: {
          metrics: true,
        },
      },
    });

    if (!repository) {
      throw new NotFoundException();
    }

    const res = await this.thirdPartyValidatorService.getRepositoryState(2);
    return res;
  }
}
