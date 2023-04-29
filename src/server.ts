import { createServer } from './create-server';
import { startStandaloneServer } from '@apollo/server/standalone';

async function bootstrap() {
  const server = await createServer();

  const { url } = await startStandaloneServer(server);
  console.log(`🚀 HTTP Server running on: ${url}`);
}

bootstrap();