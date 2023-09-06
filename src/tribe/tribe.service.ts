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
    const tribe = await this.tribeRepository.findOne({
      where: { idTribe: id },
      relations: {
        organization: true,
        repositories: {
          metrics: true,
        },
      },
    });

    if (!tribe) {
      throw new NotFoundException();
    }

    const organization = tribe.organization;
    const repositories = tribe.repositories;

    const verificationStates =
      await this.thirdPartyValidatorService.getRepositoryState(2);

    const verificationStatesMap = verificationStates.repositories.reduce(
      (map, verificationState) => {
        map[verificationState.id] = verificationState.state;
        return map;
      },
      {},
    );

    const response = repositories.map((repo) => ({
      id: repo.idRepository,
      name: repo.name,
      tribe: tribe.name,
      organization: organization.name,
      coverage: repo.metrics.coverage, // Transform to percentaje
      codeSmells: repo.metrics.codeSmells,
      bugs: repo.metrics.bugs,
      vulnerabilities: repo.metrics.vulnerabilities,
      hotspots: repo.metrics.hotspot,
      verificationState: verificationStatesMap[repo.idRepository],
      state: repo.status,
    }));

    return response;
  }
}
