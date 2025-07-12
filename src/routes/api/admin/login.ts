import express from "express";
import {Pool} from "pg";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const router = express.Router();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("BODY:", req.body);

    const result = await pool.query("SELECT * FROM admin WHERE email = $1", [email]);
    const user = result.rows[0];

    console.log("User from DB:", user);

    if (!user) {
      res.status(400).json({ error: "User not found" });
      return;
    }

    if (!password || !user.password) {
      console.log("Missing data or hash:", password, user?.password);
       res.status(400).json({ error: "Missing password or stored hash" });
       return
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
       res.status(401).json({ error: "Invalid credentials" });
       return
    }

     res.status(200).json({ message: "Login successful" });
     return
  } catch (error) {
    console.error("Login error:", error);
     res.status(500).json({ error: "Internal server error" });
     return
  }
});


export default router;