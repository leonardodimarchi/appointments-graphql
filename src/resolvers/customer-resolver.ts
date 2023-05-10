import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { CustomerViewModel } from "../dtos/view-models/customer-view-model";
import { CreateCustomerInput } from "../dtos/inputs/create-customer-input";
import { AppointmentViewModel } from "../dtos/view-models/appointment-view-model";
import { CustomerModel } from "../models/customer-model";
import { randomUUID } from "node:crypto";
import { Context } from "../create-server";

@Resolver(() => CustomerViewModel)
export class CustomerResolver {
  @Query(() => [CustomerViewModel])
  async customers(): Promise<CustomerViewModel[]> {
    const results = await CustomerModel.find();

    return results.map(customer => ({
      id: customer.id,
      name: customer.name,
      appointments: []
    }));
  }

  @Mutation(() => CustomerViewModel)
  async createCustomer(@Arg('data') data: CreateCustomerInput): Promise<CustomerViewModel> {
    const customer = new CustomerModel({
      _id: randomUUID(),
      name: data.name,
    });

    await customer.save();

    return {
      id: customer.id,
      name: customer.name,
      appointments: [],
    };
  }

  @FieldResolver(() => [AppointmentViewModel])
  async appointments(@Root() customer: CustomerViewModel, @Ctx() ctx: Context): Promise<AppointmentViewModel[]> {
    return await ctx.appointmentLoader.load(customer.id);
  }
}