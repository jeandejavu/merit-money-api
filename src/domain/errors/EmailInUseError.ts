import { CheckFieldError } from './CheckFieldError';

export class EmailInUseError extends CheckFieldError {
  constructor() {
    super('The received email is already in use');
    this.name = 'EmailInUseError';
  }
}
