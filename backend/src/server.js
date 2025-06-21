import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"
import dbConnect from "./lib/dbconnect.js";
import { app, server } from "./lib/socket.js";
import authRoutes from "./routes/auth.route.js"
import messageRoute from "./routes/message.route.js";

dotenv.config()

const port=process.env.PORT;

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoute);

server.listen(port,()=>{
    console.log(`Server is listening at port ${port}`);
    dbConnect();
})