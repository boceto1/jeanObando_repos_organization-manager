import {
  MigrationInterface,
  QueryRunner,
  Table as Repository,
  TableForeignKey,
} from 'typeorm';

export class MetricsRepository1693938351080 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Repository({
        name: 'metrics',
        columns: [
          {
            name: 'idRepository',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'coverage',
            type: 'double precision',
          },
          {
            name: 'bugs',
            type: 'int',
          },
          {
            name: 'vulnerabilities',
            type: 'int',
          },
          {
            name: 'hotspot',
            type: 'int',
          },
          {
            name: 'codeSmells',
            type: 'int',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'metrics',
      new TableForeignKey({
        columnNames: ['idRepository'],
        referencedColumnNames: ['idRepository'],
        referencedTableName: 'repository',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('metrics');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('idRepository') !== -1,
    );
    await queryRunner.dropForeignKey('metrics', foreignKey);
    await queryRunner.dropColumn('metrics', 'idRepository');
    await queryRunner.dropTable('metrics');
  }
}
