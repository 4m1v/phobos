import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import PhobiaEntity from './PhobiaEntity';

@Entity('Image')
class ImageEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: false })
  public url: string;

  @Column({ nullable: false })
  public seen: number;

  @Column({ nullable: false })
  public scariness: number;

  @Column({ nullable: false })
  public phobiaId: string;

  @ManyToOne(() => PhobiaEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'phobiaId' })
  public phobia: PhobiaEntity;

  @CreateDateColumn({ type: 'datetime', default: () => "DATETIME('now')" })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => "DATETIME('now')",
    onUpdate: "DATETIME('now')",
  })
  public updatedAt: Date;
}

export default ImageEntity;
