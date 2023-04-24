import { InputType, Field } from "type-graphql";

@InputType()
export class CreateCustomerInput {
  @Field()
  name: string;
}