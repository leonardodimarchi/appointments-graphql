import { Context, createServer } from './create-server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { getDataloaders } from './dataloaders';

async function bootstrap() {
  const server = await createServer();

  const { url } = await startStandaloneServer<Context>(server, {
    context: async ({ req, res }) => {
      return {
        req,
        res,
        ...getDataloaders(),
      }
    }
  });
  console.log(`🚀 HTTP Server running on: ${url}`);
}

bootstrap();