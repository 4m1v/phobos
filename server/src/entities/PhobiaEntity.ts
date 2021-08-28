import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import ImageEntity from './ImageEntity';

@Entity('Phobia')
class PhobiaEntity {
  @PrimaryColumn()
  public id: string;

  @Column({ nullable: false })
  public seen: number;

  @OneToMany(() => ImageEntity, (item) => item.phobiaId)
  @JoinColumn()
  public images: ImageEntity[];

  @CreateDateColumn({ type: 'datetime', default: () => "DATETIME('now')" })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => "DATETIME('now')",
    onUpdate: "DATETIME('now')",
  })
  public updatedAt: Date;
}

export default PhobiaEntity;
