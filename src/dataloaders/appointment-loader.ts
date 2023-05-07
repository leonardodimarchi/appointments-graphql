import DataLoader from "dataloader";
import { AppointmentModel } from "../models/appointment-model";
import { AppointmentViewModel } from "../dtos/view-models/appointment-view-model";

export const appointmentLoader = new DataLoader(async keys => {
  const customerIds = keys as string[];

  const appointments = await AppointmentModel.findByCustomerIds(customerIds);

  const appointmentsByCustomerId = appointments.reduce((byCustomer, appointment) => {
    const formattedAppointment: AppointmentViewModel = {
      id: appointment.id,
      customerId: appointment.customerId,
      startsAt: appointment.startsAt,
      endsAt: appointment.endsAt,
    };

    if (byCustomer[appointment.customerId])
      byCustomer[appointment.customerId].push(formattedAppointment);
    else
      byCustomer[appointment.customerId] = [formattedAppointment];

    return byCustomer;
  }, {} as Record<string, AppointmentViewModel[]>);

  return customerIds.map(id => appointmentsByCustomerId[id] ?? []);
})