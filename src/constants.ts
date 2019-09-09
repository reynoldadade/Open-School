export const constants = {
  defaultStrategy: 'jwt',
  jwtSecret: 'itsasecret',
  tokenExpiresIn: 3600,
  dbMain: {
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'R@d@d32493',
    database: 'OpenSchool',
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    synchronize: true, // for production set to false to prevent unauthorized syncing of entities
  },
  dbTest: {
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'R@d@d32493',
    database: 'testDb',
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    synchronize: true, // for production set to false to prevent unauthorized syncing of entities
  },
};
