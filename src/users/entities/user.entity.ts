import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column,
  CreateDateColumn,
  UpdateDateColumn 
} from 'typeorm';

@Entity('user_table')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({
    type: 'enum',
    enum: ['user', 'admin'],
    default: 'user'
  })
  role: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    length: 255,
    nullable: true,
    comment: '用户头像URL，存储相对路径如/uploads/avatars/avatar_1.jpg'
  })
  avatar: string;
}