import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tribe } from './entities/tribe.entity';

@Injectable()
export class TribeService {
  constructor(
    @InjectRepository(Tribe)
    private tribeRepository: Repository<Tribe>,
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
    return repository;
  }
}
