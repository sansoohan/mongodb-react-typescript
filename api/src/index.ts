// api/src/index.ts

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI as string);

app.use('/sign', authRoutes);

app.listen(process.env.PORT || 3001, () => {
  console.log("Server running on port 3001");
});
