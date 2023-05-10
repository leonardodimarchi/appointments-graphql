import "reflect-metadata";

import { ApolloServer, BaseContext } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { AppointmentsResolver } from "./resolvers/appointments-resolver";
import { CustomerResolver } from "./resolvers/customer-resolver";
import { DataLoaders } from './dataloaders';
import mongoose from "mongoose";
import path from "node:path";
import * as dotenv from 'dotenv';


export type Context = DataLoaders & BaseContext;

export async function createServer(): Promise<ApolloServer<Context>> {
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

  return new ApolloServer<Context>({
    schema,
  });
}