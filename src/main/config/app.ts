import express from 'express';
import setupRoutes from './routes';
import setupMiddleware from './middlewares';
import setupSwagger from './swagger';
import setupStaticFile from './static-file';

const app = express();
setupStaticFile(app);
setupSwagger(app);
setupMiddleware(app);
setupRoutes(app);
export default app;
