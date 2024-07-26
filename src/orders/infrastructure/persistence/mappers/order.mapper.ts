import { Discount } from 'src/orders/domain/discoount';
import { Order, OrderStatus } from 'src/orders/domain/order';
import { OrderItem } from 'src/orders/domain/order-item';
import { Adress } from 'src/orders/domain/value-objects/adress';
import { DiscountEntity } from '../entities/discount.entity';
import { OrderItemEntity } from '../entities/order-item.entity';
import { OrderEntity } from '../entities/order.entity';

export class OrderMapper {
  public static toDomain(orderEntity: OrderEntity): Order {
    const order = new Order(orderEntity.id, orderEntity.customerId);
    order.shippingAdress = new Adress(
      orderEntity.street,
      orderEntity.city,
      orderEntity.postalCode,
    );
    order.orderItems = orderEntity.items.map(
      (item) =>
        new OrderItem(item.id, item.productId, item.quantity, item.unitPrice),
    );
    order.discounts = orderEntity.discounts.map(
      (discount) => new Discount(discount.id, discount.type, discount.value),
    );
    order.createdAt = orderEntity.createdAt;
    order.status = orderEntity.status as OrderStatus;
    return order;
  }
  public static toPersistence(order: Order): OrderEntity {
    const orderEntity = new OrderEntity();
    orderEntity.id = order.id;
    orderEntity.customerId = order.customerId;
    orderEntity.street = order.shippingAdress.street;
    orderEntity.city = order.shippingAdress.city;
    orderEntity.postalCode = order.shippingAdress.postalCode;
    orderEntity.createdAt = order.createdAt;
    orderEntity.status = order.status;
    orderEntity.items = order.orderItems.map((item) => {
      const itemEntity = new OrderItemEntity();
      itemEntity.id = item.id;
      itemEntity.productId = item.productId;
      itemEntity.unitPrice = item.unitPrice;
      itemEntity.quantity = item.quantity;
      return itemEntity;
    });
    orderEntity.discounts = order.discounts.map((discount) => {
      const discountEntity = new DiscountEntity();
      discountEntity.id = discount.id;
      discountEntity.type = discount.type;
      discountEntity.value = discount.value;
      return discountEntity;
    });
    return orderEntity;
  }
}
