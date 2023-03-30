import { config } from 'dotenv';

config();

export default {
  db_uri: process.env.DB_URI || '',
  secretKey: process.env.SECRETKEY || '',
  port: process.env.PORT || 4000,
};
