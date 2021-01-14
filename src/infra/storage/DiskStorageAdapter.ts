import { ISaveFile } from '@/data/protocols';
import fs from 'fs';
import path from 'path';

export class DiskStorageAdapter implements ISaveFile {
  constructor(
    private readonly tmpFolder: string,
    private readonly uploadsFolder: string,
  ) {}

  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(this.tmpFolder, file),
      path.resolve(this.uploadsFolder, file),
    );

    return file;
  }
}
