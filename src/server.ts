
import express from "express";
import cors from "cors";
import profileRoutes from "./routes/api/admin/profile";
import uploadRoutes from "./routes/api/admin/upload";
import messageRoutes from "./routes/api/admin/message";
import adminRoutes from "./routes/api/admin/login";


const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

app.use("/api/admin/login",adminRoutes)
app.use("/api/admin/profile",profileRoutes) 
app.use("/uploads", express.static("uploads"));
app.use("/api/admin/upload",uploadRoutes);
app.use("/api/admin/message",messageRoutes);


const PORT = 5000;
app.listen(PORT, () => {
  console.log("server running on port 5000");
});
