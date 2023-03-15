import { config } from 'dotenv';

config();

export default {
  password: process.env.PASSWORD || '',
  database: process.env.DATABASE || '',
  user: process.env.USER || '',
  host: process.env.HOST || '',
  secretKey: process.env.SECRETKEY || '',
};
