import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateExampleDto } from './dto/create-example.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('examples')
  createExample(@Body() createExampleDto: CreateExampleDto): string {
    return `Created example with name: ${createExampleDto.name} and age: ${createExampleDto.age}`;
  }
}