import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  MondoDb_Url: process.env.MONGODB_URI,
};
