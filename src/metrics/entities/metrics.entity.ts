import { Repository } from 'src/repository/entities/repository.entity';
import { Entity, Column, PrimaryColumn, OneToOne } from 'typeorm';

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
  repository: Metrics;
}
