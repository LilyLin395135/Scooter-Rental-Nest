import { Controller, Post, Body, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { RentsService } from './rents.service';
import { CreateRentDto } from './dto/create-rent.dto';

@Controller('api/rents')
export class RentsController {
  constructor(private readonly rentsService: RentsService) { }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createRent(@Body() createRentDto: CreateRentDto) {
    const rent = await this.rentsService.createRent(createRentDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Rent created successfully',
      rent
    };
  }
}