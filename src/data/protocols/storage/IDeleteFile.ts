export interface IDeleteFile {
  deleteFile(file: string): Promise<void>;
}
