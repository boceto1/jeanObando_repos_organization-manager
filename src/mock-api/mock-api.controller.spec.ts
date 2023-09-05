import { Test, TestingModule } from '@nestjs/testing';
import { MockApiController } from './mock-api.controller';

describe('MockApiController', () => {
  let controller: MockApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MockApiController],
    }).compile();

    controller = module.get<MockApiController>(MockApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
