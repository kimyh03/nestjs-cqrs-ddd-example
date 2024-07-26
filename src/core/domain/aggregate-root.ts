import { AggregateRoot } from '@nestjs/cqrs';

export class AggregateRootWithId extends AggregateRoot {
  public id: string;
}
