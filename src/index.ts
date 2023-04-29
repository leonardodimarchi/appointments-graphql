import { ApolloServerFramework } from '@h4ad/serverless-adapter/lib/frameworks/apollo-server';
import { JsonBodyParserFramework } from '@h4ad/serverless-adapter/lib/frameworks/body-parser';
import { LazyFramework } from '@h4ad/serverless-adapter/lib/frameworks/lazy';
import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { DefaultHandler } from '@h4ad/serverless-adapter/lib/handlers/default';
import { PromiseResolver } from '@h4ad/serverless-adapter/lib/resolvers/promise';
import { ApiGatewayV2Adapter } from '@h4ad/serverless-adapter/lib/adapters/aws';
import { createServer } from './create-server';

async function bootstrap() {
  const app = await createServer();

  app.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();

  return app;
}

const apolloServerFramework = new JsonBodyParserFramework(
  new ApolloServerFramework(),
);

const framework = new LazyFramework(apolloServerFramework, bootstrap);

export const handler = ServerlessAdapter.new(null)
  .setFramework(framework)
  .setHandler(new DefaultHandler())
  .setResolver(new PromiseResolver())
  .addAdapter(new ApiGatewayV2Adapter())
  .build();