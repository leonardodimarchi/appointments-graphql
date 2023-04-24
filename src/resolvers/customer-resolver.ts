import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { CustomerModel } from "../dtos/models/customer-model";
import { CreateCustomerInput } from "../dtos/inputs/create-customer-input";
import { AppointmentModel } from "../dtos/models/appointment-model";

@Resolver(() => CustomerModel)
export class CustomerResolver {
  @Query(() => [CustomerModel])
  async customers() {
    return [{
      name: 'John Doe',
    }];
  }

  @Mutation(() => CustomerModel)
  async createCustomer(@Arg('data') data: CreateCustomerInput) {
    const customer: CustomerModel = {
      name: data.name,
    };

    return customer;
  }

  @FieldResolver(() => [AppointmentModel])
  async appointments(@Root() customer: CustomerModel) {
    return [
      { customerId: customer.name, startsAt: new Date(), endsAt: new Date() },
      { customerId: customer.name, startsAt: new Date(), endsAt: new Date() },
      { customerId: customer.name, startsAt: new Date(), endsAt: new Date() },
    ]
  }
}