import { IsNotEmpty, IsDateString } from 'class-validator';

export class EndRentDto {
  @IsNotEmpty()
  @IsDateString()
  endTime: Date;
}