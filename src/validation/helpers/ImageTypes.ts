import { ImageType } from '../validators';

export const makeJpegType = (): ImageType => ({
  mimetype: 'image/jpeg',
});

export const makePngType = (): ImageType => ({
  mimetype: 'image/png',
});
