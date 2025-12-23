import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./db/index.js";
import authRoutes from "./routes/auth.routes.js";
import studentRoutes from "./routes/student.routes.js";

dotenv.config();

const app = express();

// Middlewares
// app.use(cors());
app.use(
  cors({
    origin: [   
      "https://sol-9-x-mern-assignment.vercel.app" // deployed frontend 
    ],
    credentials: true
  })
);


app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

// DB Connection
connectDB();

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
