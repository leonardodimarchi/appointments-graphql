import { Field, ObjectType } from "type-graphql";
import { AppointmentViewModel } from "./appointment-view-model";

@ObjectType()
export class CustomerViewModel {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => [AppointmentViewModel])
  appointments: AppointmentViewModel[];
}