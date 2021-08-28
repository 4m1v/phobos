import { CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('Phobia')
class PhobiaEntity {
  @PrimaryColumn()
  public id: string;

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
