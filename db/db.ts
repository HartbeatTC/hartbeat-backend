const Sequelize = require('sequelize');
require('dotenv').config();

interface Config {
  logging?: boolean;
}
const isDevelopment = process.env.NODE_ENV === 'development';
const databaseName = isDevelopment
  ? process.env.DATABASE_NAME + '-test'
  : process.env.DATABASE_NAME;

if (!isDevelopment && !process.env.DATABASE_NAME) {
  throw new Error('DATABASE_NAME environment variable is not set.');
}

const config: Config = {
  logging: false,
};

if (process.env.LOGGING === 'true') {
  delete config.logging;
}

let db: typeof Sequelize;

if (process.env.NODE_ENV === 'production') {
  if (process.env.DATABASE_URL) {
    db = new Sequelize(process.env.DATABASE_URL, {
      ...config,
      dialectOptions: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    });
  } else {
    db = new Sequelize(process.env.DATABASE_URL, config);
  }
} else {
  db = new Sequelize(
    `${process.env.LOCAL_DATABASE_URL}${databaseName}`,
    config
  );
}

export default db;
