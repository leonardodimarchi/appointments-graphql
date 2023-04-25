import "reflect-metadata";

import path from "node:path";
import mongoose from "mongoose";
import * as dotenv from 'dotenv';

import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { AppointmentsResolver } from "./resolvers/appointments-resolver";
import { CustomerResolver } from "./resolvers/customer-resolver";

async function bootstrap() {
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
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    validate: {
      forbidUnknownValues: false,
    }
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen();

  console.log(`🚀 HTTP Server running on: ${url}`);
}

bootstrap();