import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AppointmentModel {
  @Field()
  startsAt: Date;

  @Field()
  endsAt: Date;
}