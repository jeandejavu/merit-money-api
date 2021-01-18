import express, { Express } from 'express';
import config from '@/main/config/upload';

export default (app: Express): void => {
  app.use('/files', express.static(config.uploadsFolder));
};
