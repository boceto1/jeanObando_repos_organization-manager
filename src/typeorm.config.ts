import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { DataSourceOptions } from 'typeorm/data-source';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

ConfigModule.forRoot({
  envFilePath: '.env',
});

export const DB_OPTIONS = {
  type: 'mysql' as MysqlConnectionOptions['type'],
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(String(process.env.DATABASE_PORT), 10) || 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [join(__dirname, 'db/migrations/**/*{.ts,.js}')],
  migrationsTableName: 'migrations',
};

export const source = new DataSource(
  DB_OPTIONS as DataSourceOptions & SeederOptions,
);
