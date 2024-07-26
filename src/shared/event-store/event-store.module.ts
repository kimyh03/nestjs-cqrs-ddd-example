import { EventStoreDBClient } from '@eventstore/db-client';
import { Module } from '@nestjs/common';
import { EventStore } from 'src/core/application/ports/event-store.service';
import { EventStorePublisher } from './application/event-publishier';
import { EventStoreDBService } from './infrastructure/event-store-db.service';

interface EventStoreModuleOptions {
  endpoint: string;
  insecure: boolean;
}

@Module({})
export class EventStoreModule {
  static forRoot({ endpoint, insecure }: EventStoreModuleOptions) {
    const client = new EventStoreDBClient({ endpoint }, { insecure });
    console.log(`EventStore connected to ${endpoint}`);
    return {
      module: EventStoreModule,
      providers: [
        {
          provide: EventStoreDBClient,
          useValue: client,
        },
        {
          provide: EventStore,
          useClass: EventStoreDBService,
        },
        EventStorePublisher,
      ],
      exports: [EventStore],
      global: true,
    };
  }
}
