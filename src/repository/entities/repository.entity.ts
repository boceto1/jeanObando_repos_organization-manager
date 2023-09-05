import { Tribe } from 'src/tribe/entities/tribe.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

export const RepositoryStateEnum = {
  ENABLE: 'E',
  DISABLE: 'D',
  ARCHIVED: 'A',
} as const;
export type RepositoryStateEnum =
  (typeof RepositoryStateEnum)[keyof typeof RepositoryStateEnum];

@Entity()
export class Repository {
  @PrimaryGeneratedColumn()
  idRepository: number;

  @Column({ length: 50, type: 'char' })
  name: string;

  @Column({ length: 1, type: 'char', enum: ['E', 'D', 'A'] })
  status: string;

  @Column({ type: 'datetime', default: Date.now() })
  createdAt: Date;

  @ManyToOne(() => Tribe, (tribe) => tribe.repositories)
  tribe: Tribe;
}
