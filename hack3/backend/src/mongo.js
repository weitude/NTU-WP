import mongoose from "mongoose";
import {dataInit} from "./upload.js";

import "dotenv-defaults/config.js";

mongoose.set("strictQuery", true);

async function connect() {
    // TODO 1 Connect to your MongoDB and call dataInit()
    //   dotenv.config();
    mongoose.set('strictQuery', false);

    if (!process.env.MONGO_URL) {
        console.error("Missing MONGO_URL!!!");
        process.exit(1);
    }
    mongoose
        .connect(process.env.MONGO_URL, {})
        .then(() => console.log("Mongo db connection created!"));
    mongoose.connection.on('error',
        console.error.bind(console, 'connection error:'));

    // TODO 1 End
    await dataInit()
}

export default {connect};
