import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { CreateAppointmentInput } from "../dtos/inputs/create-appointment-input";
import { AppointmentViewModel } from "../dtos/models/appointment-view-model";
import { CustomerViewModel } from "../dtos/models/customer-view-model";
import { AppointmentModel } from "../models/appointment-model";
import { randomUUID } from "node:crypto";

@Resolver(() => AppointmentViewModel)
export class AppointmentsResolver {
  @Query(() => [AppointmentViewModel])
  async appointments(): Promise<AppointmentViewModel[]> {
    const appointments = await AppointmentModel.find();

    return appointments.map(appointment => {
      return {
        id: appointment.id,
        startsAt: appointment.startsAt,
        endsAt: appointment.endsAt,
      };
    });
  }

  @Mutation(() => AppointmentViewModel)
  async createAppointment(@Arg('data') data: CreateAppointmentInput): Promise<AppointmentViewModel> {
    const appointment = new AppointmentModel({
      _id: randomUUID(),
      customerId: data.customerId,
      startsAt: data.startsAt,
      endsAt: data.endsAt,
    });

    await appointment.save();

    return {
      id: appointment.id,
      startsAt: appointment.startsAt,
      endsAt: appointment.endsAt,
    };
  }

  @FieldResolver(() => CustomerViewModel)
  async customer(@Root() appointment: AppointmentViewModel): Promise<CustomerViewModel> {
    return {
      name: 'My Customer'
    }
  }
}