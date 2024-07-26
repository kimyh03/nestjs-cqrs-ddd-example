import { MaterializedOrder } from '../materialized/order.materialized-model';

// Use abstract classes to define the interface instead of interfaces
// Abstract classes do not require a separate inject token, you can use class.name instead
export abstract class OrderQueryRepository {
  abstract findById(orderId: string): Promise<MaterializedOrder | undefined>;
  abstract save(order: MaterializedOrder): Promise<void>;
}
