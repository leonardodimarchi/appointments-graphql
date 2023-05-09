import { Context } from './../create-server';
import { customerLoader } from './../dataloaders/customer-loader';
import { ApolloServerPlugin } from "@apollo/server";
import { appointmentLoader } from "../dataloaders/appointment-loader";

export const ApolloServerLoaderPlugin = (): ApolloServerPlugin<Context> => ({
  requestDidStart: async () => ({
    async didResolveSource(requestContext) {
      Object.assign(requestContext.contextValue, {
        appointmentLoader,
        customerLoader,
      });
    },
  }),
});