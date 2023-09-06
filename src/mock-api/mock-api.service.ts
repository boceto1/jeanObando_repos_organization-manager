import { Injectable, NotFoundException } from '@nestjs/common';

export interface IRepository {
  id: number;
  state: number;
}

type MockDataDBType = { [key: number]: { repositories: IRepository[] } };

const MOCK_DATA: MockDataDBType = {
  1: {
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
  },
  2: {
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
  },
};

@Injectable()
export class MockApiService {
  getVerificationStatus(tribeId: number): { repositories: IRepository[] } {
    if (!(tribeId in MOCK_DATA)) {
      throw new NotFoundException();
    }

    return MOCK_DATA[tribeId];
  }
}
