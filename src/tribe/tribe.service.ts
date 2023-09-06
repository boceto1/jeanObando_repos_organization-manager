import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as RepositoryORM } from 'typeorm';
import { Tribe } from './entities/tribe.entity';
import { ThirdPartyValidatorService } from 'src/third-party-validator/third-party-validator.service';
import { Repository } from 'src/repository/entities/repository.entity';

const VERIFICATION_STATE = {
  604: 'Verificado',
  605: 'En espera',
  606: 'Aprobado',
} as const;

const REPOSITORY_STATE = {
  E: 'Enable',
  D: 'Disable',
  A: 'Archived',
} as const;

@Injectable()
export class TribeService {
  constructor(
    @InjectRepository(Tribe)
    private tribeRepository: RepositoryORM<Tribe>,
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

    const response = repositories.map((repo) =>
      this.mapResponse(
        organization.name,
        tribe.name,
        verificationStatesMap,
        repo,
      ),
    );

    return response;
  }

  private mapResponse(
    organization: string,
    tribe: string,
    verificationStateMap: any,
    repo: Repository,
  ) {
    return {
      id: repo.idRepository,
      name: repo.name,
      tribe,
      organization,
      coverage: this.parseCoverage(repo.metrics.coverage), // Transform to percentaje
      codeSmells: repo.metrics.codeSmells,
      bugs: repo.metrics.bugs,
      vulnerabilities: repo.metrics.vulnerabilities,
      hotspots: repo.metrics.hotspot,
      verificationState: this.parseVerificationState(
        verificationStateMap[repo.idRepository],
      ),
      state: this.parseRepositoryState(repo.status),
    };
  }

  private parseVerificationState(verificationStateCode: number) {
    if (!(verificationStateCode in VERIFICATION_STATE)) {
      throw new Error();
    }

    return VERIFICATION_STATE[verificationStateCode];
  }

  private parseRepositoryState(repositoryStateCode: string) {
    return REPOSITORY_STATE[repositoryStateCode];
  }

  private parseCoverage(coverage: number) {
    return `${coverage.toFixed(2)}%`;
  }
}
