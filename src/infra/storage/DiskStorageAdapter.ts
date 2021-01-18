import { IPathFile, ISaveFile } from '@/data/protocols';
import fs from 'fs';
import path from 'path';

export class DiskStorageAdapter implements ISaveFile, IPathFile {
  constructor(
    private readonly tmpFolder: string,
    private readonly uploadsFolder: string,
    private readonly staticFolder: string,
  ) {}

  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(this.tmpFolder, file),
      path.resolve(this.uploadsFolder, file),
    );

    return file;
  }

  public async pathFile(file: string): Promise<string> {
    if (!file) return '';
    return path.resolve(this.staticFolder, file);
  }
}
