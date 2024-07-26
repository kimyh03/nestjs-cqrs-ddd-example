import { Order } from 'src/orders/domain/order';

// Use abstract classes to define the interface instead of interfaces
// Abstract classes do not require a separate inject token, you can use class.name instead
export abstract class OrderCommandRepository {
  abstract save(order: Order): Promise<void>;
}
