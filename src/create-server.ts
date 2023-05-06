import "reflect-metadata";

import { ApolloServer, ApolloServerPlugin, BaseContext } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { AppointmentsResolver } from "./resolvers/appointments-resolver";
import { CustomerResolver } from "./resolvers/customer-resolver";
import mongoose from "mongoose";
import path from "node:path";
import DataLoader from "dataloader";
import * as dotenv from 'dotenv';
import { AppointmentModel, AppointmentSchema } from "./models/appointment-model";

const ApolloServerLoaderPlugin = (): ApolloServerPlugin => ({
  requestDidStart: async () => ({
    async didResolveSource(requestContext) {
      Object.assign(requestContext.contextValue, {
        appointmentLoader: new DataLoader(async keys => {
          const customerIds = keys as string[];

          const appointments = await AppointmentModel.findByCustomerIds(customerIds);

          const appointmentsByCustomerId = appointments.reduce((byCustomer, appointment) => {
            const formattedAppointment = {
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
          }, {} as any);

          return customerIds.map(id => appointmentsByCustomerId[id] ?? []);
        })
      });
    },
  }),
});

export async function createServer(): Promise<ApolloServer> {
  dotenv.config();
  const dbUrl = process.env.DB_URL;

  if (!dbUrl)
    throw new Error('Please, provide a database url.');

  await mongoose.connect(dbUrl);

  const schema = await buildSchema({
    resolvers: [
      AppointmentsResolver,
      CustomerResolver,
    ],
    emitSchemaFile: process.env.NODE_ENV === 'development' ? path.resolve(__dirname, 'schema.gql') : false,
    validate: {
      forbidUnknownValues: false,
    }
  });

  return new ApolloServer({
    schema,
    plugins: [
      ApolloServerLoaderPlugin(),
    ]
  });
}