import { Body, Controller, Post, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { ScootersService } from './scooters.service';
import { CreateScooterDto } from './dto/create-scooter.dto';

@Controller('api/scooters')
export class ScootersController {
  constructor(private readonly scootersService: ScootersService) { }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createScooter(@Body() createScooterDto: CreateScooterDto) {
    const scooter = await this.scootersService.createScooter(createScooterDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Scooter created successfully',
      scooter
    };
  }
}