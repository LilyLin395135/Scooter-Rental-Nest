import { IsNotEmpty, IsInt, IsDateString } from 'class-validator';

export class CreateRentDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  scooterId: number;

  @IsNotEmpty()
  @IsDateString()
  startTime: Date;
}