import { Router } from 'express';
import publisherRoutes from './APIs/publisher.route';

const routes = Router();

routes.use('/publisher', publisherRoutes);

export default routes;
