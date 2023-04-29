import { createServer } from './create-server';

async function bootstrap() {
  const server = await createServer();

  const { url } = await server.listen();
  console.log(`🚀 HTTP Server running on: ${url}`);
}

bootstrap();