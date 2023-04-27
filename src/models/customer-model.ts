import { ReturnModelType, getModelForClass, prop } from "@typegoose/typegoose";

class CustomerSchema {
  @prop()
  public _id!: string;

  @prop()
  public name: string;
}

export const CustomerModel = getModelForClass(CustomerSchema);