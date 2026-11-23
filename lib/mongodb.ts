import mongoose from "mongoose";

const connectionString = process.env.DB_CONNECTION_URL;

export const connectDB = async () => {
    try {

        if (!connectionString) {
            throw new Error("MongoDB connection URL is missing");
        }

        await mongoose.connect(connectionString);

        console.log("DB connection Successful");

    } catch (error) {

        console.log("DB connection Failed");
        console.error(error);

        throw error; // Important: pass the error to the API
    }
};