import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Scooter } from '../../scooters/entities/scooter.entity';

@Entity()
export class Rent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  scooter_id: number;

  @Column()
  start_time: Date;

  @Column({ nullable: true })
  end_time: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Scooter)
  @JoinColumn({ name: 'scooter_id' })
  scooter: Scooter;
}