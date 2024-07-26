import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamooseModule } from 'nestjs-dynamoose';
import { MaterializedOrder } from 'src/orders/application/materialized/order.materialized-model';
import { OrderCommandRepository } from '../application/ports/order.command-repository';
import { OrderQueryRepository } from '../application/ports/order.query-repository';
import { DiscountEntity } from './persistence/entities/discount.entity';
import { OrderItemEntity } from './persistence/entities/order-item.entity';
import { OrderEntity } from './persistence/entities/order.entity';
import { OrderCommandRepositoryImplement } from './persistence/repositories/order.comand-repository-implement';
import { OrderQueryRepositoryImplement } from './persistence/repositories/order.query-repository-implement.ts';
import { MaterializedOrderSchema } from './persistence/schema/materialized-order.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity, DiscountEntity]),
    DynamooseModule.forFeature([
      {
        name: MaterializedOrder.name,
        schema: MaterializedOrderSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: OrderCommandRepository,
      useClass: OrderCommandRepositoryImplement,
    },
    {
      provide: OrderQueryRepository,
      useClass: OrderQueryRepositoryImplement,
    },
  ],
  exports: [OrderCommandRepository, OrderQueryRepository],
})
export class OrdersInfrastructureModule {}
