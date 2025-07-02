import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileManagementController } from '@/file-management/controllers/file-management.controller';
import { FileManagementService } from '@/file-management/services/file-management.service';
import { ExcelExportService } from '@/file-management/services/excel-export.service';
import { LocalStorageStrategy } from '@/file-management/strategies/local-storage.strategy';
// import { OSSStorageStrategy } from '@/file-management/strategies/oss-storage.strategy';

@Module({
  imports: [ConfigModule],
  controllers: [FileManagementController],
  providers: [
    FileManagementService,
    ExcelExportService,
    LocalStorageStrategy,
    // OSSStorageStrategy
  ],
  exports: [FileManagementService, ExcelExportService]
})
export class FileManagementModule {}