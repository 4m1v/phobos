import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import PhobiaEntity from './PhobiaEntity';
import SlideEntity from './SlideEntity';

@Entity('Session')
class SessionEntity {
  @PrimaryColumn()
  public id: string;

  @Column({ nullable: false })
  public fearMin: number;

  @Column({ nullable: false })
  public fearMax: number;

  @Column({ nullable: false })
  public phobia_id: string;

  @ManyToOne(() => PhobiaEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'phobia_id' })
  public phobia: PhobiaEntity;

  @OneToMany(() => SlideEntity, (item) => item.session_id)
  @JoinColumn()
  public slides: SlideEntity[];

  @CreateDateColumn({ type: 'datetime', default: () => "DATETIME('now')" })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => "DATETIME('now')",
    onUpdate: "DATETIME('now')",
  })
  public updatedAt: Date;
}

export default SessionEntity;
