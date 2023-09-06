import { Organization } from '../../organization/entities/organization.entity';
import { Repository } from '../../repository/entities/repository.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Tribe {
  @PrimaryGeneratedColumn({})
  idTribe: number;

  @Column({ length: 50, type: 'char' })
  name: string;

  @Column()
  status: number;

  @ManyToOne(() => Organization, (organization) => organization.tribes)
  @JoinColumn({ name: 'idOrganization' })
  organization: Organization;

  @OneToMany(() => Repository, (repository) => repository.tribe)
  repositories: Repository[];
}
