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

@Entity('Session')
class SessionEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: false })
  public fearMin: number;

  @Column({ nullable: false })
  public fearMax: number;

  @Column({ nullable: false })
  public phobiaId: string;

  @ManyToOne(() => PhobiaEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'phobiaId' })
  public phobia: PhobiaEntity;

  @OneToMany(() => SlideEntity, (entity) => entity.session)
  @JoinColumn()
  public slides: SlideEntity[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}

export default SessionEntity;
