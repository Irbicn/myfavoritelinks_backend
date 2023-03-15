import { Router } from 'express';
import Links from '../controllers/links.controller';

const linksRouter = Router();

linksRouter.post('/add', Links.add);
linksRouter.post('/', Links.getLinks);
linksRouter.post('/id/:id', Links.getLinks);
linksRouter.post('/delete/:id', Links.delete);
linksRouter.post('/edit/:id', Links.edit);

export default linksRouter;
