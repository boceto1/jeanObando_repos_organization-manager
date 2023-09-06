import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { DataSourceOptions } from 'typeorm/data-source';

ConfigModule.forRoot({
  envFilePath: '.env',
});

const MYSQL_DB_OPTIONS = {
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [join(__dirname, 'db/migrations/**/*{.ts,.js}')],
  migrationsTableName: 'migrations',
};

const COCKROACH_DB_OPTIONS = {
  type: 'cockroachdb',
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  synchronize: false,
  logging: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [join(__dirname, 'db/migrations/**/*{.ts,.js}')],
  migrationsTableName: 'migrations',
};

const GENERAL_DB_OPTIONS = {
  mysql: MYSQL_DB_OPTIONS,
  cockroachdb: COCKROACH_DB_OPTIONS,
};

export const DB_OPTIONS = GENERAL_DB_OPTIONS[process.env.DATABASE_DRIVER];

export const source = new DataSource(
  DB_OPTIONS as DataSourceOptions & SeederOptions,
);
