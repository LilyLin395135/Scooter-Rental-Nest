import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Scooter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  model: string;

  @Column({ length: 20, unique: true })
  license_plate: string;

  @Column({ default: true })
  available: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
