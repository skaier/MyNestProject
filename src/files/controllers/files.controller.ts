import { Controller, Post, Delete, Get, Param, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'; 
import { Express } from 'express';
import { Multer } from 'multer';
import { FileManagementService } from '../services/files.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('files')
export class FileManagementController {
  constructor(private readonly fileService: FileManagementService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const { url, key } = await this.fileService.upload(file);
    return this.fileService.createFileRecord(file, url, key);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a file' })
  @ApiResponse({ 
    status: 200, 
    description: 'Delete operation completed. Returns success regardless of whether file existed.' 
  })
  async deleteFile(@Param('id') id: string) {
    return this.fileService.removeFile(parseInt(id));
  }

  @Get('url/:key')
  async getFileUrl(@Param('key') key: string) {
    return this.fileService.getUrl(key);
  }

  @Get('list')
  async getAllFiles() {
    return this.fileService.findAllFiles();
  }

  @Get('detail/:id')
  async getFile(@Param('id') id: string) {
    return this.fileService.findFileById(parseInt(id));
  }

  @Post('strategy')
  async setStrategy(@Body('strategy') strategy: string) {
    this.fileService.setStrategy(strategy as 'local' | 'oss');
  }
}