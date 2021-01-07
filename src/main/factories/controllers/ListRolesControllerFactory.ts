import { makeDbListRoles, makeLogControllerDecorator } from '@/main/factories';
import { ListRolesController } from '@/presentation/controllers';
import { IController } from '@/presentation/protocols';

export const makeListRolesController = (): IController => {
  const controller = new ListRolesController(makeDbListRoles());
  return makeLogControllerDecorator(controller);
};
