import { IPathFile } from '@/data/protocols';

export class PathFileSpy implements IPathFile {
  params = '';

  async pathFile(filename: string): Promise<string> {
    this.params = filename;
    return this.params;
  }
}
