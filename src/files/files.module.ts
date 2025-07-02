import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from '@/files/entities/files.entity'; 
import { ExcelExportService } from '@/files/services/excel-export.service';
import { LocalStorageStrategy } from '@/files/strategies/local-storage.strategy';
import { FileManagementController } from './controllers/files.controller';
import { FileManagementService } from './services/files.service';
// import { OSSStorageStrategy } from '@/files/strategies/oss-storage.strategy';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([File])
  ],
  controllers: [FileManagementController],
  providers: [
    FileManagementService,
    ExcelExportService,
    LocalStorageStrategy,
    // OSSStorageStrategy
  ],
  exports: [FileManagementService, ExcelExportService]
})
export class FilesModule {}