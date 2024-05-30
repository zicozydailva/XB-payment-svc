import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { BaseTable } from 'src/base';
import { PaymentMethod, Status } from 'src/enums/payment.enum';

@Entity()
export class Data extends BaseTable {
  @Column()
  amount: number;

  @Column()
  purchasedAt: Date;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
  })
  paymentMethod: PaymentMethod;

  @Column({
    type: 'enum',
    enum: Status,
  })
  status: Status;

  @ManyToOne(() => User, (user) => user.dataRecords)
  user: User;
}
