import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateScooterDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  model: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  licensePlate: string;
}