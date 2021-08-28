import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import PhobiaEntity from './PhobiaEntity';
import SlideEntity from './SlideEntity';

@Entity('Image')
class ImageEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: false })
  public url: string;

  @Column({ nullable: false, default: 0 })
  public seen: number;

  @Column({ nullable: false })
  public scariness: number;

  @Column({ nullable: false })
  public phobiaId: string;

  @ManyToOne(() => PhobiaEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'phobiaId' })
  public phobia: PhobiaEntity;

  @OneToMany(() => SlideEntity, (entity) => entity.imageId)
  @JoinColumn()
  public slides: SlideEntity[];

  @CreateDateColumn({ type: 'datetime', default: () => "DATETIME('now')" })
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}

export default ImageEntity;
