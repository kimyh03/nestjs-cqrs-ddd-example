import { Event } from 'src/shared/event-store/infrastructure/event-store-db.service';

export type SerilizedEvent = {
  type: string;
  data: any;
};

export abstract class EventStore {
  abstract saveEvents(
    streamId: string,
    events: SerilizedEvent[],
  ): Promise<void>;
  abstract getEvents(streamId: string, fromPosition: number): Promise<Event[]>;
}
