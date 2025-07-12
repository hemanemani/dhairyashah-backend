
import express, { Request,Response,NextFunction } from "express";
import cors from "cors";
import profileRoutes from "./routes/api/admin/profile";
import uploadRoutes from "./routes/api/admin/upload";
import messageRoutes from "./routes/api/admin/message";
import adminRoutes from "./routes/api/admin/login";


const app = express();

const allowedOrigins = [
  'https://shahdhairya.in',
  'https://www.shahdhairya.in'
];


app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
      res.sendStatus(200);
    return;
  }

  next();
});

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
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
