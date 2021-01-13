import { ImageTypeError } from '@/presentation/errors';
import { IValidation } from '@/validation/protocols';

export type ImageType = {
  mimetype: string;
};

export class ImageTypeValidator implements IValidation {
  constructor(
    private readonly fieldName: string,
    private readonly imageTypes: ImageType[],
  ) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  validate(input: any): Error | boolean {
    const file = input[this.fieldName];
    const types = this.imageTypes.map(image => image.mimetype);
    if (!types.includes(file.mimetype))
      return new ImageTypeError(file.mimetype, types);

    return true;
  }
}
