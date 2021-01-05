import {
  makeSignUpValidation,
  makeLogControllerDecorator,
  makeDbAddAccount,
} from '@/main/factories';
import { SignUpController } from '@/presentation/controllers';
import { IController } from '@/presentation/protocols';

export const makeSignUpController = (): IController => {
  const controller = new SignUpController(
    makeDbAddAccount(),
    makeSignUpValidation(),
  );
  return makeLogControllerDecorator(controller);
};
