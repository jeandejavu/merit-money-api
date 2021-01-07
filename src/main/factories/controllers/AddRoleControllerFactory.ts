import {
  makeAddRoleValidation,
  makeLogControllerDecorator,
  makeDbAddRole,
} from '@/main/factories';
import { AddRoleController } from '@/presentation/controllers';
import { IController } from '@/presentation/protocols';

export const makeAddRoleController = (): IController => {
  const controller = new AddRoleController(
    makeDbAddRole(),
    makeAddRoleValidation(),
  );
  return makeLogControllerDecorator(controller);
};
