import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateTribe1693930494923 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tribe',
        columns: [
          {
            name: 'idTribe',
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
            type: 'int',
          },
        ],
      }),
      true,
    );

    await queryRunner.addColumn(
      'tribe',
      new TableColumn({
        name: 'idOrganization',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      'tribe',
      new TableForeignKey({
        columnNames: ['idOrganization'],
        referencedColumnNames: ['idOrganization'],
        referencedTableName: 'organization',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // const table = await queryRunner.getTable('tribe');
    // const foreignKey = table.foreignKeys.find(
    //   (fk) => fk.columnNames.indexOf('idOrganization') !== -1,
    // );
    // await queryRunner.dropForeignKey('tribe', foreignKey);
    // await queryRunner.dropColumn('tribe', 'idOrganization');
    // await queryRunner.dropTable('tribe');
  }
}
