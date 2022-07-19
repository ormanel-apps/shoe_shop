import "reflect-metadata";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { ProductResolver } from "./resolvers/product/resolver";
import {
  FindManyProductsResolver,
  GroupByProductsResolver,
} from "@generated/type-graphql";
import { defaultClient } from "./client";

const app = express();

async function main() {
  // run this function to populate the database
  // populateDb();

  const schema = await buildSchema({
    resolvers: [
      ProductResolver,
      FindManyProductsResolver,
      GroupByProductsResolver,
    ],
    // authChecker: authChecker,
  });

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
    context: ({ req }) => {
      return {
        token: req.headers.authorization || null,
        prisma: defaultClient,
      };
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server started on http://localhost:4000/graphql");
  });
}

main();
