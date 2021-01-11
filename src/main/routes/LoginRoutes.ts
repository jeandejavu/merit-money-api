import { adaptRoute } from '@/main/adapters';
import { makeSignUpController } from '@/main/factories';

import { Router } from 'express';
import { makeAuthenticationController } from '../factories/controllers';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()));
  router.post('/login', adaptRoute(makeAuthenticationController()));
};
