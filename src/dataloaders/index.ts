import DataLoader from "dataloader";
import { AppointmentViewModel } from "../dtos/view-models/appointment-view-model";
import { CustomerViewModel } from "../dtos/view-models/customer-view-model";
import { appointmentLoader } from "./appointment-loader";
import { customerLoader } from "./customer-loader";

export interface DataLoaders {
  appointmentLoader: DataLoader<string, AppointmentViewModel[]>;
  customerLoader: DataLoader<string, CustomerViewModel>;
}

export const getDataloaders = (): DataLoaders => {
  return {
    appointmentLoader,
    customerLoader,
  }
}