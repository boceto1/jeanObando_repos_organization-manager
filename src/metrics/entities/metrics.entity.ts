import { Repository } from '../../repository/entities/repository.entity';
import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Metrics {
  @PrimaryColumn()
  idRepository: number;

  @Column({ type: 'float' })
  coverage: number;

  @Column({ type: 'int' })
  bugs: number;

  @Column({ type: 'int' })
  vulnerabilities: number;

  @Column({ type: 'int' })
  hotspot: number;

  @Column({ type: 'int' })
  codeSmells: number;

  @OneToOne(() => Repository, (repository) => repository.metrics)
  @JoinColumn({ name: 'idRepository' })
  repository: Metrics;
}
