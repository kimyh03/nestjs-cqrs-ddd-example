import {
  EventStoreDBClient,
  FORWARDS,
  ResolvedEvent,
  jsonEvent,
} from '@eventstore/db-client';
import { Injectable } from '@nestjs/common';
import {
  EventStore,
  SerilizedEvent,
} from 'src/core/application/ports/event-store.service';

export interface Event {
  streamId: string;
  type: string;
  data: any;
  position: number;
}

@Injectable()
export class EventStoreDBService implements EventStore {
  constructor(private readonly client: EventStoreDBClient) {}
  async saveEvents(streamId: string, events: SerilizedEvent[]): Promise<void> {
    const serializedEvents = events.map((event) => jsonEvent(event));
    await this.client.appendToStream(streamId, serializedEvents);
  }

  async getEvents(streamId: string, fromPosition?: number): Promise<Event[]> {
    const eventStream = this.client.readStream(streamId, {
      direction: FORWARDS,
      fromRevision: BigInt(fromPosition),
    });
    const events: ResolvedEvent[] = [];
    // You can use generator to avoid loading all events into memory
    for await (const event of eventStream) {
      events.push(event);
    }
    return events.map((event) => ({
      streamId,
      type: event.event.type,
      data: event.event.data,
      position: Number(event.event.revision),
    }));
  }
}
