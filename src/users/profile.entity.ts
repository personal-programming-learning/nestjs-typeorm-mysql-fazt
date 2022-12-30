import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_profile')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ nullable: true })
  age: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
