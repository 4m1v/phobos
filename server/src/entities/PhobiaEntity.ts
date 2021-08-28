import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import ImageEntity from './ImageEntity';
import SessionEntity from './SessionEntity';

@Entity('Phobia')
class PhobiaEntity {
  @PrimaryColumn()
  public id: string;

  @Column({ nullable: false })
  public description: string;

  @OneToMany(() => ImageEntity, (entity) => entity.phobia)
  @JoinColumn()
  public images: ImageEntity[];

  @OneToMany(() => SessionEntity, (entity) => entity.phobia)
  @JoinColumn()
  public sessions: SessionEntity[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}

export default PhobiaEntity;
