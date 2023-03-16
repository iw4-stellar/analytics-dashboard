import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Site } from 'src/sites/entities/site.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Site, (site) => site.user)
  sites: Site[];
}
