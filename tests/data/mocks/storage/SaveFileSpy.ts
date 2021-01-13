import { ISaveFile } from '@/data/protocols';

export class SaveFileSpy implements ISaveFile {
  params = '';

  async saveFile(filename: string): Promise<string> {
    this.params = filename;
    return this.params;
  }
}
