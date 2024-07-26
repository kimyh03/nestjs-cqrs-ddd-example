import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamooseModule } from 'nestjs-dynamoose';
import { EventStoreModule } from 'src/shared/event-store/event-store.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'nestjs-example',
      username: 'hoon',
      password: 'password',
      autoLoadEntities: true,
      synchronize: true,
    }),
    DynamooseModule.forRoot({
      local: true,
    }),
    EventStoreModule.forRoot({
      endpoint: 'localhost:2113',
      insecure: true,
    }),
  ],
})
export class CoreModule {}
