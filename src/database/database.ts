import mysql from 'promise-mysql';
import config from '../config';

const connection = mysql.createConnection(config.db_uri);

export const getConnection = () => {
  return connection;
};

export default {
  getConnection,
};
