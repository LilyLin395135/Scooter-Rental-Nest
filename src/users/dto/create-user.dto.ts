import { IsNotEmpty, IsString, MaxLength, IsMobilePhone } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  @IsMobilePhone('zh-TW')
  cellphone: string;
}