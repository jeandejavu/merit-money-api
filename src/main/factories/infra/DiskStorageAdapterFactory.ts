import { DiskStorageAdapter } from '@/infra/storage';
import config from '@/main/config/upload';

export const makeDiskStorageAdapter = (): DiskStorageAdapter => {
  return new DiskStorageAdapter(config.tmpFolder, config.uploadsFolder);
};
