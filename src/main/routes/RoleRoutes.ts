import { adaptRoute } from '@/main/adapters';
import {
  makeAddRoleController,
  makeListRolesController,
} from '@/main/factories';
import { auth } from '@/main/middlewares';
import { Router } from 'express';

export default (router: Router): void => {
  router.post('/roles', auth, adaptRoute(makeAddRoleController()));
  router.get('/roles', auth, adaptRoute(makeListRolesController()));
};
