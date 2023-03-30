import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRouter from './routes/auth.routes';
import linksRouter from './routes/links.routes';
import config from './config';

const app = express();

//Settings
app.set('port', config.port);

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

//Routes
app.use('/links', linksRouter);
app.use('/auth', authRouter);

export default app;
