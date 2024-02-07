import {SeederOptions} from 'typeorm-extension';
import {db_config} from '../config';
import {DataSource, DataSourceOptions} from 'typeorm';

const options: DataSourceOptions & SeederOptions = {
  ...db_config.options,
  seeds: ['./build/relationalDB/seed/**/*.seeder.js'],
  factories: ['./build/relationalDB/seed/**/*.factory.js'],
};

export const dataSource = new DataSource(options);
