import express from 'express';
import setupRoutes from './routes';
import setupMiddleware from './middlewares';
import setupSwagger from './swagger';

const app = express();
setupSwagger(app);
setupMiddleware(app);
setupRoutes(app);
export default app;
