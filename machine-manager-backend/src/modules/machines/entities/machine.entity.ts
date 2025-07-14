import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeUpdate } from 'typeorm';
import { MachineStatus } from '../../../common/enums/machine-status.enum';

@Entity()
export class Machine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column({
    type: 'enum',
    enum: MachineStatus,
  })
  status: MachineStatus;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp without time zone',
    nullable: true,
    default: null
  })
  updatedAt: Date | null;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
