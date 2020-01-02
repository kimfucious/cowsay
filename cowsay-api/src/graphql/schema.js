import { buildSchema } from "graphql";

export default buildSchema(`
type TokenResponse {
  _id: ID!
  email: String!
  exp: Int!
  isAdmin: Boolean!
  token: String!
  firstName: String
  lastName: String
}

type User {
  _id: ID!
  displayName: String
  email: String!
  password: String!
  firstName: String
  lastName: String
  isAdmin: Boolean
  createdAt: String
  updatedAt: String
}

input Authorize {
  clientId: String!
  responseType: String!
  redirectUri: String!
  scope: String
  state: String
}

input UpdateUserInput {
  _id: ID!
  email: String!
  firstName: String
  isAdmin: Boolean!
  lastName: String
}

type RootQuery {
  getCows: [String!]
  getCowsay(message: String character: String): String!
  getCowsayHelper(message: String!): String!
  getUser: User!
  getUsers: [User!]
} 

type RootMutation {
  deleteUser(_id: ID!): Boolean 
  loginUser(email: String! password: String!): TokenResponse
  signupUser(email: String! password: String!): TokenResponse
  updateUser(userInput: UpdateUserInput): Boolean 
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);
