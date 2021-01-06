export class FieldAlreadyExists extends Error {
  constructor(paramName: string) {
    super(`Field already exists: ${paramName}`);
    this.name = 'FieldAlreadyExists';
  }
}
