import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = {
  name: 'default',
  type: 'postgres',
  host: 'db', // Change to localhost when running not in docker
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'main',
  entities: ['dist/**/*.entity{ .ts,.js}'],
  synchronize: false,
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsRun: true,
};

export const nestConfig: TypeOrmModuleOptions = config;

export const connectionSource = new DataSource(config);
