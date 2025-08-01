
import express from "express";
import cors from "cors";
import profileRoutes from "./routes/api/admin/profile";
import uploadRoutes from "./routes/api/admin/upload";
import messageRoutes from "./routes/api/admin/message";
import adminRoutes from "./routes/api/admin/login";
import statementRoutes from "./routes/api/admin/statements";


const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'https://shahdhairya.in',
        'https://www.shahdhairya.in',
        'http://localhost:3000',
        'http://127.0.0.1:3000'
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(express.json());


app.use("/api/admin/login",adminRoutes)
app.use("/api/admin/profile",profileRoutes) 
app.use("/api/admin/statements",statementRoutes) 
app.use("/uploads", express.static("uploads"));
app.use("/api/admin/upload",uploadRoutes);
app.use("/api/admin/message",messageRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server running on port 5000");
});
