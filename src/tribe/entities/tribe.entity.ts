import { Organization } from 'src/organization/entities/organization.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Tribe {
  @PrimaryGeneratedColumn({})
  idTribe: number;

  @Column({ length: 50, type: 'char' })
  name: string;

  @Column()
  status: number;

  @ManyToOne(() => Organization, (organization) => organization.tribes)
  organization: Organization;
}
