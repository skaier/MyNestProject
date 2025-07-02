import { Injectable } from '@nestjs/common'; 
import { StorageStrategy } from '../interfaces/storage-strategy.interface';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocalStorageStrategy implements StorageStrategy {
  private readonly uploadPath: string;

  constructor(private configService: ConfigService) {
    this.uploadPath = this.configService.get('FILE_UPLOAD_PATH') || './uploads';
    console.log(this.uploadPath);
    this.ensureDirectoryExists();
  }

  private ensureDirectoryExists() {
    if (!existsSync(this.uploadPath)) {
      mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async upload(file: Express.Multer.File): Promise<{
    url: string;
    key: string; 
  }> {
    const filename = `${Date.now()}-${file.originalname}`;
    const filePath = join(this.uploadPath, filename);
    
    // Save file to disk
    const fs = require('fs');
    fs.writeFileSync(filePath, file.buffer);
    
    return {
      url: `/uploads/${filename}`,
      key: filename, 
    };
  }

  async delete(key: string): Promise<boolean> {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(this.uploadPath, key);
    
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }

  async getUrl(key: string): Promise<string> {
    return `/uploads/${key}`;
  }
}