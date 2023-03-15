import { Router } from 'express';
import Auth from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/signup', Auth.signup);
authRouter.post('/signin', Auth.signin);

export default authRouter;
