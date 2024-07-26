import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { OrderEntity } from './order.entity';
import { DiscountType } from 'src/orders/domain/discoount';

@Entity('discount')
export class DiscountEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  type: DiscountType;

  @Column()
  value: number;

  @ManyToOne(() => OrderEntity, (order) => order.discounts)
  order: OrderEntity;
}
