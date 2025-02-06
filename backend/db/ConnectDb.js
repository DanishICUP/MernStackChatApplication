import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGO_URL);
        console.log(`mongodb connect DB Host => ${res.connection.host}`);
    } catch (error) {
        console.log("Error in MongoDb Connection",error);
        process.exit(1);
    }
}

export default connectDb;