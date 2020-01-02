import "dotenv/config";
import { app } from "./app";
import mongoose from "mongoose";
import { User } from "./models";
import bcrypt from "bcryptjs";

const API_PORT = process.env.API_PORT || 4000;
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.MONGODB_DATABASE;
const DB_USER = process.env.MONGODB_USERNAME;
const DB_HOST = process.env.MONGODB_HOSTNAME;
const DB_PWD = process.env.MONGODB_PASSWORD;
const LOCALHOST = process.env.LOCALHOST;
const url = `mongodb://${DB_USER}:${DB_PWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=${DB_NAME}`;

const connect = async () => {
  try {
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useUnifiedTopology", true);
    await mongoose.connect(url);
    app.listen(API_PORT);
    console.log(`API server running at http://${LOCALHOST}:${API_PORT}`);
    console.log(`GraphQL endpoint: http://${LOCALHOST}:${API_PORT}/graphql`);
    console.log(
      `Access db via Compass: mongodb://${DB_USER}:${DB_PWD}@${LOCALHOST}:${DB_PORT}/${DB_NAME}?authSource=${DB_NAME}`
    );
    const firstUser = await User.findOne();
    if (!firstUser) {
      const password = await bcrypt.hash("P@ssw0rd123", 12);
      const user = new User({
        email: "elsie@cowsay.moo",
        password,
        isAdmin: true
      });
      await user.save();
      console.log("Admin user created!");
    }
  } catch (error) {
    console.log(error);
  }
};

connect();
