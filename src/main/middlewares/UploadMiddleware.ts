import multer from 'multer';
import config from '@/main/config/upload';

export const upload = multer(config.multer);
