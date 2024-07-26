import { InjectModel, Model } from 'nestjs-dynamoose';
import { MaterializedOrder } from 'src/orders/application/materialized/order.materialized-model';
import { OrderQueryRepository } from 'src/orders/application/ports/order.query-repository';
import { MaterializedOrderKey } from '../schema/materialized-order.schema';

export class OrderQueryRepositoryImplement implements OrderQueryRepository {
  constructor(
    @InjectModel(MaterializedOrder.name)
    private readonly orderModel: Model<MaterializedOrder, MaterializedOrderKey>,
  ) {}
  async findById(orderId: string): Promise<MaterializedOrder | undefined> {
    const key: MaterializedOrderKey = { id: orderId };
    return await this.orderModel.get(key);
  }
  async save(order: MaterializedOrder): Promise<void> {
    await this.orderModel.update(order);
  }
}
