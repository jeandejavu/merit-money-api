import express from 'express';
import setupRoutes from './routes';
import setupMiddleware from './middlewares';

const app = express();
setupMiddleware(app);
setupRoutes(app);
export default app;
