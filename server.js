import mongoose from "mongoose";
import app from "./index.js";
import config from "./config/config.js";

async function main() {
  try {
    await mongoose.connect(config.MondoDb_Url);
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

