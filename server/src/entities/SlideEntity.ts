import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import ImageEntity from './ImageEntity';
import SessionEntity from './SessionEntity';

@Entity('Slide')
class SlideEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: false })
  public order: number;

  @Column({ nullable: false })
  public scariness: number;

  @Column({ nullable: false })
  public imageId: string;

  @ManyToOne(() => ImageEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'imageId' })
  public image: ImageEntity;

  @Column({ nullable: false })
  public sessionId: string;

  @ManyToOne(() => SessionEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sessionId' })
  public session: SessionEntity;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}

export default SlideEntity;
