import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

export const connectDB = async () => {
    try{
        await mongoose.connect(
            `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.8mscreh.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("Database connected successfully");
    } catch (error) {
        console.log(error);
        throw new Error("Error connecting to database");
    }
}