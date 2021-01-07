import { CheckFieldError } from './CheckFieldError';

export class ModelNotExists extends CheckFieldError {
  constructor(paramName: string) {
    super(`${paramName} not exists`);
    this.name = 'ModelNotExists';
  }
}
