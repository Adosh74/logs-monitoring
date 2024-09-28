import { Router } from 'express';
import publisherController from '../../controllers/publisher.controller';

const routes = Router();

routes.post('/log', publisherController.publishBody);

export default routes;
