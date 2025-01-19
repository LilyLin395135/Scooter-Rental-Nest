import { Controller, Patch, Param, Post, Body, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { RentsService } from './rents.service';
import { CreateRentDto } from './dto/create-rent.dto';
import { EndRentDto } from './dto/end-rent.dto';

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
      rent: {
        id: rent.id,
        userId: rent.user_id,
        scooterId: rent.scooter_id,
        startTime: rent.start_time,
        endTime: rent.end_time
      }
    };
  }

  @Patch(':id/return')
  @UsePipes(new ValidationPipe({ transform: true }))
  async returnRent(@Param('id') id: number, @Body() endRentDto: EndRentDto) {
    const rent = await this.rentsService.endRent(id, new Date(endRentDto.endTime));
    return {
      statusCode: HttpStatus.OK,
      message: 'Rent ended successfully',
      rent: {
        id: rent.id,
        userId: rent.user_id,
        scooterId: rent.scooter_id,
        startTime: rent.start_time,
        endTime: rent.end_time
      }
    };
  }
}