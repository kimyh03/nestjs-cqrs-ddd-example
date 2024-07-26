import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { DiscountEntity } from './discount.entity';
import { OrderItemEntity } from './order-item.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  customerId: string;

  @Column()
  postalCode: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  status: string;

  @OneToMany(() => OrderItemEntity, (item) => item.order, {
    cascade: ['insert', 'update'],
  })
  items: OrderItemEntity[];

  @OneToMany(() => DiscountEntity, (discount) => discount.order, {
    cascade: ['insert', 'update'],
  })
  discounts: DiscountEntity[];

  @Column()
  createdAt: Date;
}
