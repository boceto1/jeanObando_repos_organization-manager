import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrganization1693925325638 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'organization',
        columns: [
          {
            name: 'idOrganization',
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
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('organization');
  }
}
