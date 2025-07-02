import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ExcelExportService } from '../file-management/services/excel-export.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpStatus } from '../common/constants/http-status.constants';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly excelExportService: ExcelExportService,
  ) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The user has been successfully created.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  @ApiBody({ 
    type: CreateUserDto,
    examples: {
      example1: {
        value: {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'P@ssw0rd',
          role: 'user',
          isActive: true,
          avatar: '/uploads/avatars/default.jpg'
        },
        description: 'Example of creating a new user'
      }
    }
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('list')
  @ApiOperation({ summary: 'Get paginated list of users' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Return paginated list of users.',
    schema: {
      example: {
        data: [],
        total: 0,
        page: 1,
        limit: 10
      }
    }
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @Get('detail/:id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the user with given ID.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The user has been successfully updated.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  @ApiBody({ 
    type: UpdateUserDto,
    examples: {
      example1: {
        value: {
          name: 'John Doe Updated',
          email: 'john.updated@example.com',
          password: 'NewP@ssw0rd',
          role: 'admin',
          isActive: false,
          avatar: '/uploads/avatars/new.jpg'
        },
        description: 'Example of updating a user'
      }
    }
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The user has been successfully deleted.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get('export')
  @ApiOperation({ summary: 'Export users to Excel' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Excel file with users data',
    content: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
        schema: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  async exportToExcel(@Res() res: Response) {
    const users = await this.usersService.findAllForExport();
    const headers = ['id', 'name', 'email', 'createdAt', 'updatedAt'];
    const excelBuffer = await this.excelExportService.exportToExcel(
      users,
      headers,
      'users_export'
    );

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=users_export.xlsx'
    );
    res.send(excelBuffer);
  }
}