import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AppointmentViewModel {
  @Field()
  id: string;

  @Field()
  startsAt: Date;

  @Field()
  endsAt: Date;
}