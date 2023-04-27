import { Field, ObjectType } from "type-graphql";
import { CustomerViewModel } from "./customer-view-model";

@ObjectType()
export class AppointmentViewModel {
  @Field()
  id: string;

  @Field()
  customerId: string;

  @Field()
  startsAt: Date;

  @Field()
  endsAt: Date;

  @Field({ nullable: true })
  customer?: CustomerViewModel;
}