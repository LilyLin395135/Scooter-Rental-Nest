import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateScooterDto } from './dto/create-scooter.dto';
import { Scooter } from './entities/scooter.entity';

@Injectable()
export class ScootersService {
  constructor(
    @InjectRepository(Scooter)
    private scootersRepository: Repository<Scooter>,
  ) { }

  async createScooter(createScooterDto: CreateScooterDto): Promise<Scooter> {
    const existingScooter = await this.scootersRepository.findOne({
      where: { license_plate: createScooterDto.licensePlate }
    });

    if (existingScooter) {
      throw new BadRequestException('A scooter with this license plate already exists');
    }
    const scooter = this.scootersRepository.create({
      model: createScooterDto.model,
      license_plate: createScooterDto.licensePlate,
    });
    return this.scootersRepository.save(scooter);
  }
}