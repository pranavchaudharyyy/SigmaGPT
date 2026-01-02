import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
    connectDB();
});

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected with Database!");
        console.log("API KEY LOADED:", process.env.OPENAI_API_KEY ? "YES" : "NO");







        app.get("/api/test", (req, res) => {
  res.send("Backend is connected!");
});

        











    } catch(err) {
        console.log("Failed to connect with Db", err);
    }
}