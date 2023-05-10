# Appointments API

A simple API just to remember how to use GraphQL and to learn more about [serverless](https://www.serverless.com/) and [serverless-adapter](https://serverless-adapter.viniciusl.com.br/).

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

I'm using [serverless](https://www.serverless.com/) alongside with [serverless-adapter](https://serverless-adapter.viniciusl.com.br/) to deploy the API at AWS (Lambda + API Gateway). The AWS Lambda handler is implemented at the [index.ts](src/index.ts) file.

To deploy the API, all i have to do is setup the .env file with my DB_URL and run `npm run deploy`.

## N+1 problem

The n+1 problem means that the server executes multiple unnecessary trips to the database to fetch nested data (Field Resolvers). For example, if we are fetching 10 customers and their appointments, we'll be doing 10 extra trips (one for each user) to the database to get those appointments.

### Why it is a problem

- It is more efficient to fetch 10 appointments in a single query than 10 queries that fetch one appointment.

- If an entitiy has references in multiple other entities, then we're wasting resources fetching something we already have.

### Solutions

- One of the most common solutions is to use [dataloader](https://github.com/graphql/dataloader), that batches all of the ids so you can fetch the relations in only one call to the database (you can even fetch from another database).

- Using conditional joins to fetch all of the data at one call to the database.

### Related

[ApolloGraphQL - How Federation handles the N+1 query problem](https://www.apollographql.com/docs/technotes/TN0019-federation-n-plus-1/)

[Shopify Engineering - Solving the N+1 Problem for GraphQL through Batching](https://shopify.engineering/solving-the-n-1-problem-for-graphql-through-batching#:~:text=The%20n%2B1%20problem%20means,the%20address%20for%20N%20authors.)

## Apollo Server vs Mercurius

We can see Apollo Server and Mercurius as libraries that adapt the GraphQL spec to NodeJS, making it easier to create GraphQL APIs. Both of them have pros and cons, in which i will try to explain here.

### Apollo Server

**Ecosystem**: Large and established ecosystem, with a good documentation, a lot of plugins, integrations, and community resources.

**Performance**: Apollo Server is generally considered to be slower than Mercurius, especially when it comes to handling large GraphQL schemas or high traffic volumes. The performance can be improved using different methods, such as using fastify and graphql-jit for example.

### Mercurius

**Ecosystem**: Mercurius is a relatively new library and has a smaller community than Apollo Server. This means that there are fewer plugins, integrations, and community resources available.

**Performance**: It doesn't add much overhead, could be a good choice if your priority is to have a good performance out of the box.

### Related

[Benwad - Node GraphQL Benchmarks](https://github.com/benawad/node-graphql-benchmarks/blob/master/README.md)

# TODO
- [x] Add a simple server
- [x] Create the normal server
- [x] Create the CustomerResolver
- [x] Create MongoDB connection
- [x] Create AppointmentModel and implement it at the resolver
- [x] Create CustomerModel and implement it at the resolver
- [x] Deploy
- [x] Find ways to solve the N+1 problem
- [x] Create dataloaders
- [x] @Ctx type at the field resolvers
- [ ] Test [Mercurius](https://mercurius.dev/)
