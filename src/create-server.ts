import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { AppointmentsResolver } from "./resolvers/appointments-resolver";
import { CustomerResolver } from "./resolvers/customer-resolver";
import mongoose from "mongoose";
import path from "node:path";
import * as dotenv from 'dotenv';

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
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    validate: {
      forbidUnknownValues: false,
    }
  });

  return new ApolloServer({
    schema,
  });
}