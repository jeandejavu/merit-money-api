import { adaptRoute } from '@/main/adapters';
import { makeAddRoleController } from '@/main/factories';

import { Router } from 'express';

export default (router: Router): void => {
  router.post('/roles', adaptRoute(makeAddRoleController()));
};
