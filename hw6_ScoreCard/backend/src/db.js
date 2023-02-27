import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";

export default {
    connect: () => {
        dotenv.config();
        mongoose.connect(
            process.env.MONGO_URL, {
                dbName: "DB",
            })
            .then(() => console.log("mongo db connection created"));
    }
}
