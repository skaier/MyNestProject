import { Controller, Post, Delete, Get, Param, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileManagementService } from '../services/file-management.service';
import { Express } from 'express';
import { Multer } from 'multer';

@Controller('files')
export class FileManagementController {
  constructor(private readonly fileService: FileManagementService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.upload(file);
  }

  @Delete(':key')
  async deleteFile(@Param('key') key: string) {
    return this.fileService.delete(key);
  }

  @Get(':key')
  async getFileUrl(@Param('key') key: string) {
    return this.fileService.getUrl(key);
  }

  @Post('strategy')
  async setStrategy(@Body('strategy') strategy: string) {
    this.fileService.setStrategy(strategy as 'local' | 'oss');
  }
}