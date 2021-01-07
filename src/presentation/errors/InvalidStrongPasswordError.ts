export class InvalidStrongPasswordError extends Error {
  constructor() {
    super(
      'Invalid password field meets the requirements of at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character',
    );
    this.name = 'InvalidStrongPasswordError';
  }
}
