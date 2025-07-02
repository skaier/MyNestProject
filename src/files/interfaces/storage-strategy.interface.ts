export interface StorageStrategy {
  upload(file: Express.Multer.File): Promise<{
    url: string;
    key: string; 
  }>;
  delete(key: string): Promise<boolean>;
  getUrl(key: string): Promise<string>;
}