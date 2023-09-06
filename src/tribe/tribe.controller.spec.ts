import { Test, TestingModule } from '@nestjs/testing';
import { TribeController } from './tribe.controller';
import { TribeService } from './tribe.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tribe } from './entities/tribe.entity';
import { ThirdPartyValidatorService } from '../third-party-validator/third-party-validator.service';

describe('TribeController', () => {
  let controller: TribeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TribeService,
        {
          provide: ThirdPartyValidatorService,
          useValue: jest.fn(),
        },
        {
          provide: getRepositoryToken(Tribe),
          useFactory: jest.fn(),
        },
      ],
      controllers: [TribeController],
    }).compile();

    controller = module.get<TribeController>(TribeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
