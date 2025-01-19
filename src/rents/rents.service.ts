import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRentDto } from './dto/create-rent.dto';
import { Rent } from './entities/rent.entity';

@Injectable()
export class RentsService {
  constructor(
    @InjectRepository(Rent)
    private rentRepository: Repository<Rent>,
  ) { }

  async createRent(createRentDto: CreateRentDto): Promise<Rent> {
    const { userId, scooterId, startTime } = createRentDto;

    // Check for active rent by user
    const activeRentByUser = await this.rentRepository.findOne({
      where: { user_id: userId, end_time: null }
    });

    if (activeRentByUser) {
      throw new BadRequestException('User already has an active rent');
    }

    // Check if the scooter is already rented
    const activeRentByScooter = await this.rentRepository.findOne({
      where: { scooter_id: scooterId, end_time: null }
    });

    if (activeRentByScooter) {
      throw new BadRequestException('Scooter is currently rented');
    }

    const rent = this.rentRepository.create({
      user_id: userId,
      scooter_id: scooterId,
      start_time: startTime
    });
    return this.rentRepository.save(rent);
  }
}