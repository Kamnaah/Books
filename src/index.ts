import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { BookResolver } from "./resolvers/BookResolver";

async function main() {
  const connection = await createConnection({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "Kamn@1012",
    "database": "Books",
    "entities": [
        "./src/models/*.ts"
    ],
    "synchronize": true
  })
  const schema = await buildSchema( {resolvers: [BookResolver]})
  const server = new ApolloServer({ schema })
  await server.listen(4000)
  console.log("Server has started!")
}
main()