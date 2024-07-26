import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { EventBus, IEvent, IEventPublisher } from '@nestjs/cqrs';
import { EventStore } from 'src/core/application/ports/event-store.service';
import { AggregateRootWithId } from 'src/core/domain/aggregate-root';

@Injectable()
export class EventStorePublisher
  implements OnApplicationBootstrap, IEventPublisher
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly eventStore: EventStore,
  ) {}

  onApplicationBootstrap() {
    this.eventBus.publisher = this;
  }

  publish<T extends IEvent>(event: T, dispatcher: AggregateRootWithId) {
    this.eventStore.saveEvents(dispatcher.id, [
      {
        type: event.constructor.name,
        data: JSON.stringify(event),
      },
    ]);
  }

  publishAll<T extends IEvent = IEvent>(
    events: T[],
    dispatcher: AggregateRootWithId,
  ) {
    console.log(`Publishing ${events.length} events`);
    this.eventStore.saveEvents(
      dispatcher.id,
      events.map((event) => ({
        type: event.constructor.name,
        data: event,
      })),
    );
  }
}
