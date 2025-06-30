import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateExampleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  age: number;
}