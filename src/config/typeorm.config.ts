import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { constants } from '../constants';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: constants.dbMain.host,
  port: constants.dbMain.port,
  username: constants.dbMain.username,
  password: constants.dbMain.password,
  database: constants.dbMain.database,
  entities: constants.dbMain.entities,
  synchronize: constants.dbMain.synchronize, // for production set to false to prevent unauthorized syncing of entities
};
