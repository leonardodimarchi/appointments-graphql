import { customerLoader } from './../dataloaders/customer-loader';
import { ApolloServerPlugin } from "@apollo/server";
import { appointmentLoader } from "../dataloaders/appointment-loader";

export const ApolloServerLoaderPlugin = (): ApolloServerPlugin => ({
  requestDidStart: async () => ({
    async didResolveSource(requestContext) {
      Object.assign(requestContext.contextValue, {
        appointmentLoader,
        customerLoader,
      });
    },
  }),
});