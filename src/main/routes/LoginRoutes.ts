import { adaptRoute } from '@/main/adapters';
import { makeSignUpController } from '@/main/factories';

import { Router } from 'express';
import { makeAuthenticationController } from '../factories/controllers';
import { upload } from '../middlewares';

export default (router: Router): void => {
  router.post(
    '/signup',
    upload.single('avatar'),
    adaptRoute(makeSignUpController()),
  );
  router.post('/login', adaptRoute(makeAuthenticationController()));
};
