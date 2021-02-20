import startServer from "./startServer";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

const firebase = require("firebase");
const firebase_admin = require("firebase-admin");
require("firebase/firestore");

//  Toda request é POST
//  Toda request bate no MESMO endpoint (/graphql)

//  Query => Obter informações (GET)
//  Mutation => Manipular dados(POST/Put/PATCH/DELETE)
//  Scalar types => String, Int, Boolean, Float e ID

startServer({ typeDefs, resolvers });
