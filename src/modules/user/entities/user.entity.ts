import { Column, Entity, OneToMany } from 'typeorm';
import { Airtime } from '../../airtime/entities/airtime.entity';
import { BaseTable } from 'src/base';
import { Electricity } from 'src/modules/electricity/entities/electricity.entity';
import { Data } from '../../data/entities/data.entity';

@Entity()
export class User extends BaseTable {
  @Column({
    type: 'int',
    nullable: false,
    unique: true,
  })
  user_id: number;

  // @PrimaryGeneratedColumn()
  // id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @OneToMany(() => Airtime, (airtime) => airtime.user)
  airtimeRecords: Airtime[];

  @OneToMany(() => Data, (data) => data.user)
  dataRecords: Data[];

  @OneToMany(() => Electricity, (electricity) => electricity.user)
  electricityRecords: Electricity[];
}
