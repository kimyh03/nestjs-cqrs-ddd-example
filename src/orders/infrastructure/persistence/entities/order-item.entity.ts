import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('order_item')
export class OrderItemEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  productId: string;

  @Column()
  quantity: number;

  @Column()
  unitPrice: number;

  @ManyToOne(() => OrderEntity, (order) => order.items)
  order: OrderEntity;
}
