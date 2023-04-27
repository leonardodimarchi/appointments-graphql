import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class CustomerViewModel {
  @Field()
  id: string;

  @Field()
  name: string;
}