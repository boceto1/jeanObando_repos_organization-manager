import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  idOrganization: number;

  @Column({ length: 50, type: 'char' })
  name: string;

  @Column()
  status: number;
}
