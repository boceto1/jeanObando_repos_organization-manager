import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as RepositoryORM } from 'typeorm';
import { Tribe } from './entities/tribe.entity';
import { ThirdPartyValidatorService } from '../third-party-validator/third-party-validator.service';
import { Repository } from '../repository/entities/repository.entity';
import {
  FilterByEnum,
  GetRepositoryMetricsQueryDto,
  REPOSITORY_STATE,
  RepositoryClientStateEnum,
} from './dto/get-repository-metrics-query.dto';
import { json2csv } from 'json-2-csv';

const VerificationStateEnum = {
  604: 'Verificado',
  605: 'En espera',
  606: 'Aprobado',
} as const;
type VerificationStateEnum =
  (typeof VerificationStateEnum)[keyof typeof VerificationStateEnum];

export interface IResponseMetrics {
  id: number;
  name: string;
  tribe: string;
  organization: string;
  coverage: string; // Transform to percentaje
  codeSmells: number;
  bugs: number;
  vulnerabilities: number;
  hotspots: number;
  verificationState: VerificationStateEnum;
  state: RepositoryClientStateEnum;
}

@Injectable()
export class TribeService {
  constructor(
    @InjectRepository(Tribe)
    private tribeRepository: RepositoryORM<Tribe>,
    private thirdPartyValidatorService: ThirdPartyValidatorService,
  ) {}

  async getRepositoryMetrics(
    id: number,
    query?: GetRepositoryMetricsQueryDto,
  ): Promise<IResponseMetrics[]> {
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
      throw new NotFoundException('La Tribu no se encuentra registrada');
    }

    const organization = tribe.organization;
    const clientFilters = query
      ? {
          [FilterByEnum.DATE]: query.from,
          [FilterByEnum.COVERAGE]: query.minCoverage,
          [FilterByEnum.STATE]: query.state,
        }
      : {};

    const repositories = this.filterRepository(
      tribe.repositories,
      clientFilters,
    );

    const isFilterByCoverageDefined =
      FilterByEnum.COVERAGE in clientFilters &&
      clientFilters[FilterByEnum.COVERAGE] !== undefined;

    if (repositories.length === 0 && !isFilterByCoverageDefined) {
      throw new NotFoundException(
        'La Tribu no tiene repositorios que cumplan con la cobertura necesaria',
      );
    }

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

  async generateRepositoryMetricsReport(
    id: number,
    query: GetRepositoryMetricsQueryDto,
  ): Promise<any> {
    const metrics = await this.getRepositoryMetrics(id, query);
    const csv = await json2csv(metrics);
    return csv;
  }

  private mapResponse(
    organization: string,
    tribe: string,
    verificationStateMap: any,
    repo: Repository,
  ): IResponseMetrics {
    return {
      id: repo.idRepository,
      name: repo.name,
      tribe,
      organization,
      coverage: this.parseCoverage(repo.metrics.coverage),
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
    if (!(verificationStateCode in VerificationStateEnum)) {
      throw new Error();
    }

    return VerificationStateEnum[verificationStateCode];
  }

  private parseRepositoryState(
    repositoryStateCode: string,
  ): RepositoryClientStateEnum {
    return RepositoryClientStateEnum[repositoryStateCode];
  }

  private parseCoverage(coverage: number): string {
    return `${coverage.toFixed(2)}%`;
  }

  private filterRepository(
    repositories: Repository[],
    clientFilters: { [key: string]: any },
  ): Repository[] {
    const runFilters = (repo: Repository) => {
      const filters = [];

      const clientState =
        REPOSITORY_STATE[clientFilters[FilterByEnum.STATE]] ||
        REPOSITORY_STATE.Enable;

      filters.push(repo.status === clientState);

      filters.push(
        clientFilters[FilterByEnum.COVERAGE]
          ? repo.metrics.coverage > clientFilters[FilterByEnum.COVERAGE]
          : repo.metrics.coverage > 75,
      );

      if (clientFilters[FilterByEnum.DATE]) {
        filters.push(
          new Date(repo.createdAt).getTime() >=
            new Date(clientFilters[FilterByEnum.DATE]).getTime(),
        );
      }
      return filters;
    };

    const res = repositories.filter((repo) => {
      return runFilters(repo).every((filter) => {
        return filter;
      });
    });

    return res;
  }
}
