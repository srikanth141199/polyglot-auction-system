We initialized two core "engines" for our Go service. Here is the breakdown of what they are and the "Magic" they perform.

1. lib/pq (The Postgres Driver)
Think of this as the physical cable that connects your Go code to the Postgres database sitting in Docker.

What it is: A pure Go driver for the PostgreSQL database.

What it solves: Go has a built-in library called database/sql, but it doesn't know how to "speak" Postgres. lib/pq provides the translation layer so Go can send SQL commands and receive data from Postgres.

Why we used it: It is the most stable and widely used driver in the Go ecosystem.

2. gqlgen (The GraphQL Engine)
This is the most powerful part of our Go stack. It is a Schema-First generator.

What it is: A library for building type-safe GraphQL servers in Go.

What it solves: Usually, in other languages, you have to write your models in code AND in a schema (double work). gqlgen solves this by generating the code from the schema.

What it created for you:

graph/model/models_gen.go: It read your .graphql file and automatically created Go structs for Auction and Bid. You never have to manually write these types.

graph/generated.go: This is a massive file you should never touch. It handles the complex "plumbing" of parsing incoming GraphQL requests.

graph/schema.resolvers.go: It created "empty shells" (functions) where you write your business logic.


🔄 The "Dependency Injection" (The Bridge)
The most important thing we did after initialization was connecting these two libraries in server.go.

We used lib/pq to create a db object (the database connection).

We passed that db object into the Resolver struct.

Because gqlgen generated the resolvers to be part of that struct, every GraphQL function now has access to the database.

Interview Tip: "I used gqlgen for a schema-first approach to ensure that my API contract is the 'single source of truth.' I then used dependency injection to provide the Postgres database handle to my resolvers, making the service modular and easy to unit test."