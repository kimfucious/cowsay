import { cowsayRoutes } from "./routes/cowsay";
import { gqlResolvers } from "./graphql/resolvers";
import { isAuthorized as authorization } from "./middleware";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import gqlSchema from "./graphql/schema";
import graphqlHttp from "express-graphql";
import helmet from "helmet";
import morgan from "morgan";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("combined"));
app.use(cowsayRoutes);
app.use(authorization);
app.use(
  "/graphql",
  graphqlHttp({
    schema: gqlSchema,
    rootValue: gqlResolvers,
    graphiql: true,

    // graphiql: process.env.NODE_ENV === "development" ? true : false,
    customFormatErrorFn(error) {
      if (!error.originalError) {
        console.log("NO ORIGINAL ERROR", error);
        return error;
      }
      console.log("Original error", error);
      return {
        message: error.message || "Unknown error",
        statusCode: error.originalError.statusCode || 500,
        data: error.originalError.errorData | [],
        locations: error.locations,
        stack: error.stack ? error.stack.split("\n") : [],
        path: error.path
      };
    }
  })
);
app.use((err, req, res, next) => {
  console.log(err);
  const code = err.statusCode || 500;
  res.status(code).json({ message: err.message, errorData: err.data });
});

export { app };
