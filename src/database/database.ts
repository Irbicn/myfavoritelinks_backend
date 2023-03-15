import mysql from 'promise-mysql';
import config from '../config';

const connection = mysql.createConnection({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
});

export const getConnection = () => {
  return connection;
};

export default {
  getConnection,
};
