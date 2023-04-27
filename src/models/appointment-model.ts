import { ReturnModelType, getModelForClass, prop } from "@typegoose/typegoose";

class AppointmentSchema {
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
}

export const AppointmentModel = getModelForClass(AppointmentSchema);