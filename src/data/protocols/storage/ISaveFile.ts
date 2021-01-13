export interface ISaveFile {
  saveFile(file: string): Promise<string>;
}
