import { ReturnModelType, getModelForClass, prop } from "@typegoose/typegoose";

class CustomerSchema {
  @prop()
  public _id!: string;

  @prop()
  public name: string;

  static async findByIds(this: ReturnModelType<typeof CustomerSchema>, ids: string[]) {
    return this.find({ _id: { $in: ids } }).exec();
  }
}

export const CustomerModel = getModelForClass(CustomerSchema);