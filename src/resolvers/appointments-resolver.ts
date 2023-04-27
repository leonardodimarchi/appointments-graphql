import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { CreateAppointmentInput } from "../dtos/inputs/create-appointment-input";
import { AppointmentViewModel } from "../dtos/models/appointment-view-model";
import { CustomerViewModel } from "../dtos/models/customer-view-model";

@Resolver(() => AppointmentViewModel)
export class AppointmentsResolver {
  @Query(() => [AppointmentViewModel])
  async appointments() {
    return [{
      startsAt: new Date(),
      endsAt: new Date(),
    }];
  }

  @Mutation(() => AppointmentViewModel)
  async createAppointment(@Arg('data') data: CreateAppointmentInput) {
    const appointment: AppointmentViewModel = {
      startsAt: data.startsAt,
      endsAt: data.endsAt,
    };

    return appointment;
  }

  @FieldResolver(() => CustomerViewModel)
  async customer(@Root() appointment: AppointmentViewModel) {
    return {
      name: 'My Customer'
    }
  }
}