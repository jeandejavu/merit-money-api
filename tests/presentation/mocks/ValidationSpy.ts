import { IValidation } from '@/presentation/protocols';

export class ValidationSpy implements IValidation {
  error: Error;

  input: any;

  validate(input: any): Error | boolean {
    this.input = input;
    return this.error ?? true;
  }
}
