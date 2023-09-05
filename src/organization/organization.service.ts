import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';
import { OKResult } from 'src/utils/types';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationsRepository: Repository<Organization>,
  ) {}

  async create(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<OKResult> {
    const organization = await this.organizationsRepository.create(
      createOrganizationDto,
    );
    await this.organizationsRepository.save(organization);
    return { ok: true, message: 'Organization was created successfully' };
  }

  findAll(): Promise<Organization[]> {
    return this.organizationsRepository.find();
  }

  async findOne(id: number): Promise<Organization> {
    const organization = await this.organizationsRepository.findOne({
      where: { idOrganization: id },
    });
    if (!organization) {
      throw new NotFoundException();
    }
    return organization;
  }

  async update(
    id: number,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<OKResult> {
    const updatedResult = await this.organizationsRepository.update(
      id,
      updateOrganizationDto,
    );

    if (updatedResult.affected === 0) {
      throw new NotFoundException();
    }
    return { ok: true, message: 'Organization was updated successfully' };
  }

  async remove(id: number): Promise<Organization[]> {
    const deletedResult = await this.organizationsRepository.softDelete(id);
    if (deletedResult.affected === 0) {
      throw new NotFoundException();
    }
    return this.findAll();
  }
}
