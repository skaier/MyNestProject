import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../entities/files.entity';
import { StorageStrategy } from '../interfaces/storage-strategy.interface';
import { LocalStorageStrategy } from '../strategies/local-storage.strategy';
// import { OSSStorageStrategy } from '../strategies/oss-storage.strategy';
import { ConfigService } from '@nestjs/config'; 

@Injectable()
export class FileManagementService {
  private strategy: StorageStrategy;

  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
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

  async createFileRecord(file: Express.Multer.File, url: string, fileKey: string) {
    const newFile = this.fileRepository.create({
      name: file.originalname,
      path: url,
      fileKey,
      mimeType: file.mimetype,
      size: file.size,
      storageType: 'local',
      isPublic: true
    });
    return this.fileRepository.save(newFile);
  }

  async findAllFiles() {
    return this.fileRepository.find();
  }

  async findFileById(id: number) {
    return this.fileRepository.findOne({ where: { id } });
  }

  async removeFile(id: number) {
    const file = await this.fileRepository.findOne({ where: { id } });
    if (!file) {
      throw new Error('File not found');
    }
    await this.strategy.delete(file.fileKey);
    return this.fileRepository.delete(id);
  }
}