export class CheckFieldError extends Error {
  constructor(paramName: string) {
    super(paramName);
    this.name = 'CheckFieldError';
  }
}
