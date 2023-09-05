import { Tribe } from 'src/tribe/entities/tribe.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  idOrganization: number;

  @Column({ length: 50, type: 'char' })
  name: string;

  @Column()
  status: number;

  @DeleteDateColumn()
  public deletedAt: Date;

  @OneToMany(() => Tribe, (tribe) => tribe.organization)
  tribes: Tribe[];
}
