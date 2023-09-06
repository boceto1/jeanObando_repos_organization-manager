import { Test, TestingModule } from '@nestjs/testing';
import { TribeService } from './tribe.service';
import { Tribe } from './entities/tribe.entity';
import { Repository as RepositoryOrm } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { ThirdPartyValidatorService } from '../third-party-validator/third-party-validator.service';
import { Organization } from '../organization/entities/organization.entity';
import { Repository } from '../repository/entities/repository.entity';
import { Metrics } from '../metrics/entities/metrics.entity';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<object>;
};

export const tribeRepositoryMockFactory: () => MockType<RepositoryOrm<Tribe>> =
  jest.fn(() => ({
    findOne: jest.fn(),
  }));

const generateMockTribe = (coverage = 76) => {
  const MOCK_TRIBE = {
    idTribe: 1,
    name: 'mock tribe',
    organization: MOCK_ORG,
    status: 1,
  } as Tribe;

  const MOCK_REPOSITORY = {
    idRepository: 1,
    name: 'mock repo',
    status: 'E',
    logicStatus: 'A',
    tribe: MOCK_TRIBE,
  } as Repository;

  const MOCK_METRICS_VALID = {
    idRepository: 1,
    bugs: 0,
    codeSmells: 0,
    coverage,
    hotspot: 2,
    vulnerabilities: 3,
    repository: MOCK_REPOSITORY,
  } as Metrics;

  MOCK_REPOSITORY.metrics = MOCK_METRICS_VALID;

  MOCK_TRIBE.repositories = [MOCK_REPOSITORY];

  return MOCK_TRIBE;
};

const MOCK_ORG = {
  idOrganization: 1,
  name: 'mock org',
  status: 1,
} as Organization;

const MOCK_THIRD_PARTY_VALIDATOR_RESPONSE = {
  repositories: [
    {
      id: 1,
      state: 604,
    },
    {
      id: 2,
      state: 605,
    },
    {
      id: 3,
      state: 606,
    },
  ],
};

const thirdPartyValidatorServiceMock = {
  getRepositoryState: jest.fn(),
};

describe('TribeService', () => {
  let service: TribeService;
  let repositoryMock: MockType<RepositoryOrm<Tribe>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TribeService,
        {
          provide: ThirdPartyValidatorService,
          useValue: thirdPartyValidatorServiceMock,
        },
        {
          provide: getRepositoryToken(Tribe),
          useFactory: tribeRepositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<TribeService>(TribeService);
    repositoryMock = module.get(getRepositoryToken(Tribe));
  });

  describe('getRepositoryMetrics', () => {
    describe('when there is a tribu with repository and metrics', () => {
      it('it should return a mapped response with verification state coming form third party', async () => {
        const mockTribe = generateMockTribe();
        repositoryMock.findOne.mockReturnValue(mockTribe);
        thirdPartyValidatorServiceMock.getRepositoryState.mockResolvedValue(
          MOCK_THIRD_PARTY_VALIDATOR_RESPONSE,
        );

        const response = await service.getRepositoryMetrics(1);

        expect(response.length).toBe(1);
        const repositoryMetrics = response[0];

        expect(repositoryMetrics).toBeDefined();
        expect(repositoryMetrics.organization).toBe('mock org');
        expect(repositoryMetrics.tribe).toBe('mock tribe');
        expect(repositoryMetrics.state).toBe('Enable');
        expect(repositoryMetrics.verificationState).toBe('Verificado');
      });
    });
    describe('when there is not a tribu', () => {
      it('throws a Not Found Execption', async () => {
        repositoryMock.findOne.mockReturnValue(null);

        try {
          await service.getRepositoryMetrics(1);
        } catch (error) {
          expect(error).toEqual(
            new NotFoundException('La Tribu no se encuentra registrada'),
          );
        } finally {
          expect(repositoryMock.findOne).toBeCalledTimes(1);
          expect(repositoryMock.findOne).toBeCalledWith({
            where: { idTribe: 1 },
            relations: {
              organization: true,
              repositories: {
                metrics: true,
              },
            },
          });
        }
      });
    });
    describe('when there is not a tribu with the right coverage and coverage filter is not defined', () => {
      it('throws a NotFound Exception', async () => {
        const noValidTribe = generateMockTribe(10);
        repositoryMock.findOne.mockReturnValue(noValidTribe);
        thirdPartyValidatorServiceMock.getRepositoryState.mockResolvedValue(
          MOCK_THIRD_PARTY_VALIDATOR_RESPONSE,
        );

        try {
          await service.getRepositoryMetrics(1);
        } catch (error) {
          expect(error).toEqual(
            new NotFoundException(
              'La Tribu no tiene repositorios que cumplan con la cobertura necesaria',
            ),
          );
        }
      });
    });
    describe('when there is not a tribu with the right coverage but coverage filter is defined', () => {
      it('returns an empty array', async () => {
        const noValidTribe = generateMockTribe();
        repositoryMock.findOne.mockReturnValue(noValidTribe);
        thirdPartyValidatorServiceMock.getRepositoryState.mockResolvedValue(
          MOCK_THIRD_PARTY_VALIDATOR_RESPONSE,
        );

        const response = await service.getRepositoryMetrics(1, {
          minCoverage: 90,
          from: undefined,
          state: undefined,
        });
        expect(response.length).toBe(0);
      });
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
