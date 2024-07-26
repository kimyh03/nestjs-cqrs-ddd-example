import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CoreModule } from './core/core.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [CoreModule, CqrsModule.forRoot(), OrdersModule],
})
export class AppModule {}
