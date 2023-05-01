# Appointments API

A simple API just to keep me in shape

## Servers

**Server**: Can be found at the src folder, it uses TypeGraphQL and MongoDB with Typegoose (`npm run dev`)

**Simple server**: It is the simple-server.ts file, where i didn't use TypeGraphQL, just the ApolloServer and an in-memory database. (`npm run dev:simple`)

## GraphQL

### Some problems that it aims to solve

**Under fetching**: When the HTTP endpoint returns less data than what we need

**Over fetching**: When the HTTP endpoint returns more data than what we need

### Approaches

**Schema first**: Updating the schema before implementing a new query or mutation

**Code first**: Code first and the schema will automatically update (that is where *TypeGraphQL* comes in)

## MongoDB

One of the benefits of using a NoSQL database is that you are not constrained to a rigid schema. But being fully flexible can be challenging aswell.

### Approaches

There are different approaches to handle with MongoDB database interactions:

**MongoDB NodeJS Driver**: The official driver to work with MongoDB using Javascript. It allows the database to do what it is best at, being flexible.

**Mongoose (ODM)**: It is a NodeJS based Object Data Modeling library (just like an ORM for SQL databases). It helps us by creating a schema and performing validations at the application layer.

> Here is where Typegoose comes in, helping us to create Mongoose schemas with Typescript

## Deploy

I'm using [serverless](https://www.serverless.com/) alongside with [serverless-adapter](https://serverless-adapter.viniciusl.com.br/) to deploy the API at AWS (Lambda + API Gateway).

To deploy the API, all i have to do is setup the .env file with my DB_URL and run `npm run deploy`.

## TODO
- [x] Add a simple server
- [x] Create the normal server
- [x] Create the CustomerResolver
- [x] Create MongoDB connection
- [x] Create AppointmentModel and implement it at the resolver
- [x] Create CustomerModel and implement it at the resolver
- [x] Deploy
