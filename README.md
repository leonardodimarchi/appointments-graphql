# Appointments API

A simple API just to keep me in shape

## Servers

**Server**: Can be found at the src folder

**Simple server**: It is the simple-server.ts file, where i didn't use TypeGraphQL, just the ApolloServer

## Some problems that GraphQL solves

**Under fetching**: When the HTTP endpoint returns less data than what we need

**Over fetching**: When the HTTP endpoint returns more data than what we need

## Approaches

**Schema first**: Updating the schema before implementing a new query or mutation

**Code first**: Code first and the schema will automatically update (that is where *TypeGraphQL* comes in)

## TODO
- [x] Add a simple server
- [x] Create the normal server
- [x] Create the CustomerResolver
- [ ] Add MongoDB
- [ ] Deploy
