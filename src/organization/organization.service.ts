import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationsRepository: Repository<Organization>,
  ) {}

  async create(createOrganizationDto: CreateOrganizationDto) {
    const organization = await this.organizationsRepository.create(
      createOrganizationDto,
    );
    await this.organizationsRepository.save(organization);
    return { ok: true, message: 'Organization was created successfully' };
  }

  findAll() {
    return this.organizationsRepository.find();
  }

  async findOne(id: number) {
    const organization = await this.organizationsRepository.findOne({
      where: { idOrganization: id },
    });
    if (!organization) {
      throw new NotFoundException();
    }
    return organization;
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    const updatedResult = await this.organizationsRepository.update(
      id,
      updateOrganizationDto,
    );

    if (updatedResult.affected === 0) {
      throw new NotFoundException();
    }
    return { ok: true, message: 'Organization was updated successfully' };
  }

  async remove(id: number) {
    const deletedResult = await this.organizationsRepository.softDelete(id);
    if (deletedResult.affected === 0) {
      throw new NotFoundException();
    }
    return this.findAll();
  }
}
