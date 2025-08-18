import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { getUserFromCookies } from "../../../helper/helper";
import { signToken } from "../../../services/jwt";
import { prisma } from "../../../services/prisma";
import { addProduct, createSale, getAllProducts, getAllSales, productPage } from "./resolvers/products";
import { createUser, getAllUsers, updateUserProfile, updateUserRole } from "./resolvers/user";

const typeDefs = gql`
  type Query {
    loginUser(userCred: String!, password: String!): Boolean
    currentUser: User
    getAllUsers: [User]
    getAllProducts: [Product]
    productPage(id: String): Product
    getAllSales(productId: ID!): [Sale!]!

  }

  type Mutation {
    createSale(id: String, quantity: Int): Boolean
    createUser(name: String!, email: String!, username: String!, password: String!, role: String!): User
    updateUserRole(userId: String!, role: String!): Boolean
    updateUserProfile(userId: String, name: String, email: String, username: String, avatar: String, bio: String, phoneNumber: String): Boolean
    addProduct(title: String!, description: String!, category: String!, price: Float!): Product
    # createProfile(bio: String, phoneNumber: String): Profile
  }

  type Product {
    id: String
    title: String
    description: String
    category: String
    price: Float
    stock: Int
    imageUrl: String
    sales: [Sale]
  }

  type Profile {
    id: ID!
    bio: String
    phoneNumber: String
    user: User!
  }

  type User {
    id: String
    name: String
    username: String
    email: String
    avatar: String
    role: String
  }

  type Sale {
    id: ID!
    productId: ID!
    quantity: Int!
    createdAt: String!
  }
`;

const resolvers = {
  Query: {
    loginUser: async (_: any, args: {
      userCred: string,
      password: string
    }) => {

      try {

        const cookieStore = cookies();
        const user = await prisma.user.findUnique({
          where: {
            email: args.userCred
          }
        })

        if (!user) {
          return false;
        }
        if (user.password === args.password) {
          const token = signToken({ id: user.id });
          cookieStore.set("token", token);
          return true;
        }
        else {
          return false;
        }

      } catch (error) {
        return false;
      }
    },
    currentUser: getUserFromCookies,
    getAllUsers,
    getAllProducts,
    productPage,
    getAllSales
  },
  Mutation: {
    createUser,
    updateUserRole,
    updateUserProfile,
    addProduct,
    createSale,
    // createProfile
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Typescript: req has the type NextRequest
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async req => ({ req }),
});

export { handler as GET, handler as POST };
