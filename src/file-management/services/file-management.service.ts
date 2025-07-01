import { Injectable } from '@nestjs/common';
import { StorageStrategy } from '../interfaces/storage-strategy.interface';
import { LocalStorageStrategy } from '../strategies/local-storage.strategy';
// import { OSSStorageStrategy } from '../strategies/oss-storage.strategy';
import { ConfigService } from '@nestjs/config'; 

@Injectable()
export class FileManagementService {
  private strategy: StorageStrategy;

  constructor(
    private readonly localStorage: LocalStorageStrategy,
    // private readonly ossStorage: OSSStorageStrategy,
    private readonly configService: ConfigService
  ) {
    this.setStrategy(this.configService.get('FILE_STORAGE_STRATEGY') || 'local');
  }

  setStrategy(strategy: 'local' | 'oss') {
    switch (strategy) {
      // case 'oss':
      //   this.strategy = this.ossStorage;
      //   break;
      case 'local':
      default:
        this.strategy = this.localStorage;
        break;
    }
  }

  async upload(file: Express.Multer.File) {
    return this.strategy.upload(file);
  }

  async delete(key: string) {
    return this.strategy.delete(key);
  }

  async getUrl(key: string) {
    return this.strategy.getUrl(key);
  }
}