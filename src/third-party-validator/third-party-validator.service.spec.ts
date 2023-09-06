import { Test, TestingModule } from '@nestjs/testing';
import { ThirdPartyValidatorService } from './third-party-validator.service';
import { HttpModule } from '@nestjs/axios';

describe('ThirdPartyValidatorService', () => {
  let service: ThirdPartyValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ThirdPartyValidatorService],
    }).compile();

    service = module.get<ThirdPartyValidatorService>(
      ThirdPartyValidatorService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
