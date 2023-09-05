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

  create(createOrganizationDto: CreateOrganizationDto) {
    return this.organizationsRepository.create(createOrganizationDto);
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

  update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return this.update(id, updateOrganizationDto);
  }

  remove(id: number) {
    return this.organizationsRepository.softDelete(id);
  }
}
