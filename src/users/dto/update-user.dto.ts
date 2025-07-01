import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { User } from '../entities/user.entity';

export class UpdateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'User full name',
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'User email address',
    required: false
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: 'P@ssw0rd',
    description: 'User password (min 6 characters)',
    minLength: 6,
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiProperty({
    example: 'user',
    description: 'User role',
    enum: ['user', 'admin'],
    required: false
  })
  @IsOptional()
  @IsEnum(['user', 'admin'])
  role?: User['role'];

  @ApiProperty({
    example: true,
    description: 'Is user active',
    required: false
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    example: '/uploads/avatars/default.jpg',
    description: 'User avatar URL',
    required: false
  })
  @IsOptional()
  @IsString()
  avatar?: string;
}