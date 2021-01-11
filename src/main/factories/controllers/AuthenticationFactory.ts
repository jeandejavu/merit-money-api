import {
  makeDbAuthentication,
  makeAuthenticationValidation,
  makeLogControllerDecorator,
} from '@/main/factories';
import { IController } from '@/presentation/protocols';
import { AuthenticationController } from '@/presentation/controllers';

export const makeAuthenticationController = (): IController => {
  const controller = new AuthenticationController(
    makeDbAuthentication(),
    makeAuthenticationValidation(),
  );
  return makeLogControllerDecorator(controller);
};
