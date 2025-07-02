import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // 用户上传的原始文件名，用于前端展示和下载时的默认文件名

  @Column()
  path: string;

  @Column()
  size: number;

  @Column()
  mimeType: string;

  @Column({ nullable: true })
  fileKey: string; // 系统生成的唯一文件标识符(格式:时间戳-原始文件名)，用于存储策略中的文件操作

  @Column({ default: 'local' })
  storageType: string; // local, oss, etc.

  @Column({ default: true })
  isPublic: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}