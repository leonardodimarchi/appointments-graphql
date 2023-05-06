import { ReturnModelType, getModelForClass, prop } from "@typegoose/typegoose";

export class AppointmentSchema {
  @prop()
  public _id!: string;

  @prop()
  customerId: string;

  @prop()
  startsAt: Date;

  @prop()
  endsAt: Date;

  static async findByCustomerId(this: ReturnModelType<typeof AppointmentSchema>, customerId: string) {
    return this.find({ customerId }).exec();
  }

  static async findByCustomerIds(this: ReturnModelType<typeof AppointmentSchema>, customerIds: string[]) {
    return this.find({ customerId: { $in: customerIds } }).exec();
  }
}

export const AppointmentModel = getModelForClass(AppointmentSchema);