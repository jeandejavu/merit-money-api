export class FieldAlreadyExistsError extends Error {
  constructor(paramName: string) {
    super(`Field already exists: ${paramName}`);
    this.name = 'FieldAlreadyExistsError';
  }
}
