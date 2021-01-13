import { ImageTypeValidator } from '@/validation/validators';
import { makeJpegType, makePngType } from '@/validation/helpers/ImageTypes';
import { ImageTypeError } from '@/presentation/errors';

import faker from 'faker';

const field = faker.random.word();

const makeSut = (): ImageTypeValidator => {
  return new ImageTypeValidator(field, [makeJpegType(), makePngType()]);
};

describe('ImageType Validator', () => {
  test('Should return a ImageTypeError if validation fails', () => {
    const sut = makeSut();
    const error = sut.validate({ [field]: { mimetype: 'any/type' } });
    expect(error).toBeInstanceOf(ImageTypeError);
  });

  test('Should not return if validation succeeds', () => {
    const sut = makeSut();
    const error = sut.validate({
      [field]: { mimetype: makeJpegType().mimetype },
    });
    expect(error).toBe(true);
  });
});
