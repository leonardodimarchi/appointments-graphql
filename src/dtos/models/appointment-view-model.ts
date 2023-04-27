import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AppointmentViewModel {
  @Field()
  startsAt: Date;

  @Field()
  endsAt: Date;
}