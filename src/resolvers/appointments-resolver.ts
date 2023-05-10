import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { CreateAppointmentInput } from "../dtos/inputs/create-appointment-input";
import { AppointmentViewModel } from "../dtos/view-models/appointment-view-model";
import { CustomerViewModel } from "../dtos/view-models/customer-view-model";
import { AppointmentModel } from "../models/appointment-model";
import { randomUUID } from "node:crypto";
import { CustomerModel } from "../models/customer-model";
import { Context } from "../create-server";

@Resolver(() => AppointmentViewModel)
export class AppointmentsResolver {
  @Query(() => [AppointmentViewModel])
  async appointments(): Promise<AppointmentViewModel[]> {
    const appointments = await AppointmentModel.find();

    return appointments.map(appointment => ({
      id: appointment.id,
      customerId: appointment.customerId,
      startsAt: appointment.startsAt,
      endsAt: appointment.endsAt,
    }));
  }

  @Mutation(() => AppointmentViewModel)
  async createAppointment(@Arg('data') data: CreateAppointmentInput): Promise<AppointmentViewModel> {
    const customer = await CustomerModel.findById(data.customerId);

    if (!customer)
      throw new Error('Customer not found.');

    const appointment = new AppointmentModel({
      _id: randomUUID(),
      customerId: data.customerId,
      startsAt: data.startsAt,
      endsAt: data.endsAt,
    });

    await appointment.save();

    return {
      id: appointment.id,
      customerId: appointment.customerId,
      startsAt: appointment.startsAt,
      endsAt: appointment.endsAt,
    };
  }

  @FieldResolver(() => CustomerViewModel)
  async customer(@Root() appointment: AppointmentViewModel, @Ctx() ctx: Context): Promise<CustomerViewModel | null> {
    return await ctx.customerLoader.load(appointment.customerId);
  }
}