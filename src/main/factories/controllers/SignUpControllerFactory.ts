import {
  makeSignUpValidation,
  makeLogControllerDecorator,
  makeDbAddAccount,
} from '@/main/factories';
import { SignUpController } from '@/presentation/controllers';
import { IController } from '@/presentation/protocols';
import { makeEtherealMailFactory } from '../infra/EtherealMailFactory';

export const makeSignUpController = (): IController => {
  const controller = new SignUpController(
    makeDbAddAccount(),
    makeSignUpValidation(),
    makeEtherealMailFactory(),
  );
  return makeLogControllerDecorator(controller);
};
