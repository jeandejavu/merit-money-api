export class ImageTypeError extends Error {
  constructor(typeFile: string, typeAllow: string[]) {
    super(`Invalid image type: ${typeFile} , allow ${typeAllow.join(',')}`);
    this.name = 'InvalidImageTypeError';
  }
}
