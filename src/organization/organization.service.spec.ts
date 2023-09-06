import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationService } from './organization.service';
import { Organization } from './entities/organization.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { describe } from 'node:test';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<object>;
};

export const organizationRepositoryMockFactory: () => MockType<
  Repository<Organization>
> = jest.fn(() => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  softDelete: jest.fn(),
}));

const MOCK_ORG = {
  idOrganization: 1,
  name: 'mock-org',
  status: 1,
} as Organization;

describe('OrganizationService', () => {
  let service: OrganizationService;
  let repositoryMock: MockType<Repository<Organization>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationService,
        {
          provide: getRepositoryToken(Organization),
          useFactory: organizationRepositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<OrganizationService>(OrganizationService);
    repositoryMock = module.get(getRepositoryToken(Organization));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    describe('when a solution was created successfully', () => {
      it('return Organization was created successfully', async () => {
        const response = await service.create({ name: 'org a', status: 1 });
        expect(repositoryMock.create).toBeCalledTimes(1);
        expect(repositoryMock.create).toBeCalledWith({
          name: 'org a',
          status: 1,
        });
        expect(repositoryMock.save).toBeCalledTimes(1);

        expect(response.ok).toBe(true);
        expect(response.message).toBe('Organization was created successfully');
      });
    });
  });

  describe('findAll', () => {
    describe('when there is no items', () => {
      it('return an empty array', async () => {
        repositoryMock.find.mockReturnValueOnce([]);
        const response = await service.findAll();
        expect(response.length).toBe(0);
      });
    });
    describe('when there is items', () => {
      it('return the list of items', async () => {
        repositoryMock.find.mockReturnValueOnce([MOCK_ORG]);
        const response = await service.findAll();

        expect(repositoryMock.find).toBeCalledTimes(1);
        expect(repositoryMock.find).toBeCalledWith();
        expect(response.length).toBe(1);
        expect(response[0].name).toBe(MOCK_ORG.name);
      });
    });
  });

  describe('findOne', () => {
    describe('when there is that element', () => {
      it('returns the element', async () => {
        repositoryMock.findOne.mockReturnValue(MOCK_ORG);
        const response = await service.findOne(1);

        expect(repositoryMock.findOne).toBeCalledTimes(1);
        expect(repositoryMock.findOne).toBeCalledWith({
          where: { idOrganization: 1 },
        });
        expect(response).toBeDefined();
        expect(response.name).toBe(MOCK_ORG.name);
      });
    });
    describe('when there is not elements', () => {
      it('throws a Not Found Execption', async () => {
        try {
          await service.findOne(1);
        } catch (error) {
          expect(error).toEqual(new NotFoundException());
        } finally {
          expect(repositoryMock.findOne).toBeCalledTimes(1);
          expect(repositoryMock.findOne).toBeCalledWith({
            where: { idOrganization: 1 },
          });
        }
      });
    });
  });

  describe('update', () => {
    describe('when an element is updated', () => {
      it('returns Organization was updated successfully', async () => {
        repositoryMock.update.mockReturnValue({ affected: 1 });

        const response = await service.update(1, { name: 'Org Updated' });

        expect(repositoryMock.update).toBeCalledTimes(1);
        expect(repositoryMock.update).toBeCalledWith(1, {
          name: 'Org Updated',
        });
        expect(response.ok).toBe(true);
        expect(response.message).toBe('Organization was updated successfully');
      });
    });
    describe('when no element is updated', () => {
      it('throws a Not Found Execption', async () => {
        repositoryMock.update.mockReturnValue({ affected: 0 });

        try {
          await service.update(1, { name: 'Org Updated' });
        } catch (error) {
          expect(error).toEqual(new NotFoundException());
        } finally {
          expect(repositoryMock.update).toBeCalledTimes(1);
          expect(repositoryMock.update).toBeCalledWith(1, {
            name: 'Org Updated',
          });
        }
      });
    });
  });

  describe('remove', () => {
    describe('when the element is deleted', () => {
      it('returns the remaining items', async () => {
        repositoryMock.softDelete.mockReturnValue({ affected: 1 });
        repositoryMock.find.mockReturnValue([]);

        const response = await service.remove(1);

        expect(repositoryMock.softDelete).toBeCalledTimes(1);
        expect(repositoryMock.softDelete).toBeCalledWith(1);
        expect(repositoryMock.find).toBeCalledTimes(1);
        expect(repositoryMock.find).toBeCalledWith();
        expect(response.length).toBe(0);
      });
    });
    describe('when the element does not exist', () => {
      it('throws a Not Found Execption', async () => {
        repositoryMock.softDelete.mockReturnValue({ affected: 0 });

        try {
          await service.remove(1);
        } catch (error) {
          expect(error).toEqual(new NotFoundException());
        } finally {
          expect(repositoryMock.softDelete).toBeCalledTimes(1);
          expect(repositoryMock.softDelete).toBeCalledWith(1);
          expect(repositoryMock.find).toBeCalledTimes(0);
        }
      });
    });
  });
});
