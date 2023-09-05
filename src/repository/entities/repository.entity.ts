import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Metrics } from 'src/metrics/entities/metrics.entity';
import { Tribe } from 'src/tribe/entities/tribe.entity';

export const RepositoryStateEnum = {
  ENABLE: 'E',
  DISABLE: 'D',
  ARCHIVED: 'A',
} as const;
export type RepositoryStateEnum =
  (typeof RepositoryStateEnum)[keyof typeof RepositoryStateEnum];

export const LogicRepositoryStateEnum = {
  ACTIVE: 'A',
  INACTIVE: 'I',
} as const;
export type LogicRepositoryStateEnum =
  (typeof LogicRepositoryStateEnum)[keyof typeof LogicRepositoryStateEnum];

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

  @Column({ length: 1, type: 'varchar', enum: ['A', 'I'] })
  logicStatus: string;

  @ManyToOne(() => Tribe, (tribe) => tribe.repositories)
  tribe: Tribe;

  @OneToOne(() => Metrics, (metrics) => metrics.repository)
  metrics: Metrics;
}
