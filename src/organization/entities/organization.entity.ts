import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
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
}
