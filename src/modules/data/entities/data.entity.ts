import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { BaseTable } from 'src/base';

@Entity()
export class Data extends BaseTable {
  @Column()
  amount: number;

  @Column()
  paymentMethod: string; // e.g., 'credit card', 'debit card', 'paypal'

  @Column()
  status: string; // e.g., 'completed', 'pending', 'failed'

  @ManyToOne(() => User, (user) => user.dataRecords)
  user: User;
}
