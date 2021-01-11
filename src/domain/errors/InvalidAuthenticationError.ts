import { CheckFieldError } from './CheckFieldError';

export class InvalidAuthenticationError extends CheckFieldError {
  constructor() {
    super('Email or password not exists');
    this.name = 'InvalidAuthenticationError';
  }
}
