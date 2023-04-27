import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { CustomerViewModel } from "../dtos/view-models/customer-view-model";
import { CreateCustomerInput } from "../dtos/inputs/create-customer-input";
import { AppointmentViewModel } from "../dtos/view-models/appointment-view-model";

@Resolver(() => CustomerViewModel)
export class CustomerResolver {
  @Query(() => [CustomerViewModel])
  async customers() {
    return [{
      name: 'John Doe',
    }];
  }

  @Mutation(() => CustomerViewModel)
  async createCustomer(@Arg('data') data: CreateCustomerInput) {
    const customer: CustomerViewModel = {
      name: data.name,
    };

    return customer;
  }

  @FieldResolver(() => [AppointmentViewModel])
  async appointments(@Root() customer: CustomerViewModel) {
    return [
      { customerId: customer.name, startsAt: new Date(), endsAt: new Date() },
      { customerId: customer.name, startsAt: new Date(), endsAt: new Date() },
      { customerId: customer.name, startsAt: new Date(), endsAt: new Date() },
    ]
  }
}