import { Context } from './../create-server';
import { ApolloServerPlugin } from "@apollo/server";
import { getDataloaders } from '../dataloaders';

export const ApolloServerLoaderPlugin = (): ApolloServerPlugin<Context> => ({
  requestDidStart: async () => ({
    async didResolveSource(requestContext) {
      Object.assign(requestContext.contextValue, {
        ...getDataloaders(),
      });
    },
  }),
});