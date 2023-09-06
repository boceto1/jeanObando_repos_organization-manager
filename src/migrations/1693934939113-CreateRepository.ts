import {
  MigrationInterface,
  QueryRunner,
  Table as Repository,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateRepository1693934939113 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Repository({
        name: 'repository',
        columns: [
          {
            name: 'idRepository',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            generatedType: 'STORED',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['E', 'D', 'A'],
          },
          {
            name: 'createdAt',
            type: 'datetime',
          },
          {
            name: 'logicStatus',
            type: 'enum',
            enum: ['A', 'I'],
          },
        ],
      }),
      true,
    );

    await queryRunner.addColumn(
      'repository',
      new TableColumn({
        name: 'idTribe',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      'repository',
      new TableForeignKey({
        columnNames: ['idTribe'],
        referencedColumnNames: ['idTribe'],
        referencedTableName: 'tribe',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('repository');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('idTribe') !== -1,
    );
    await queryRunner.dropForeignKey('repository', foreignKey);
    await queryRunner.dropColumn('repository', 'idTribe');
    await queryRunner.dropTable('repository');
  }
}
