import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.db_url}`);
    });
  } catch (error) {
    console.log(error)
  }
}
// mongodb://localhost:27017
