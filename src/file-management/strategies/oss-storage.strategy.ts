import { Injectable } from '@nestjs/common'; 
import { StorageStrategy } from '../interfaces/storage-strategy.interface';
import * as OSS from 'ali-oss';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OSSStorageStrategy implements StorageStrategy {
  private client: OSS; 

  constructor(private configService: ConfigService) {
    this.client = new OSS({
      region: this.configService.get('OSS_REGION'),
      accessKeyId: this.configService.get('OSS_ACCESS_KEY_ID'),
      accessKeySecret: this.configService.get('OSS_ACCESS_KEY_SECRET'),
      bucket: this.configService.get('OSS_BUCKET'),
    });
  }

  async upload(file: Express.Multer.File): Promise<{
    url: string;
    key: string;
    statusCode: number;
  }> {
    const filename = `${Date.now()}-${file.originalname}`;
    const result = await this.client.put(filename, file.buffer);
    
    return {
      url: result.url,
      key: filename,
      statusCode: 201
    };
  }

  async delete(key: string): Promise<boolean> {
    try {
      await this.client.delete(key);
      return true;
    } catch (e) {
      return false;
    }
  }

  async getUrl(key: string): Promise<string> {
    return this.client.signatureUrl(key);
  }
}