import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class CustomerViewModel {
  @Field()
  name: string;
}