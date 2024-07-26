import { Module } from '@nestjs/common';
import { CreateOrderCommandHandler } from './application/commands/create-order.command-handler';
import { FindOrderQueryHandler } from './application/queries/find-order.query-handler';
import { OrderFactory } from './domain/factories/order.factory';
import { DiscountService } from './domain/services/discount.service';
import { OrdersInfrastructureModule } from './infrastructure/orders-infrastructure.module';
import { OrdersController } from './presentation/orders.controller';

@Module({
  imports: [OrdersInfrastructureModule],
  controllers: [OrdersController],
  providers: [
    CreateOrderCommandHandler,
    FindOrderQueryHandler,
    OrderFactory,
    DiscountService,
  ],
})
export class OrdersModule {}
