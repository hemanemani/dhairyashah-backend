import express from "express";
import {Pool} from "pg";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const router = express.Router();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

router.post("/",async(req,res): Promise<void>=>{

    const {email,password} = req.body;
        console.log("Login req body:", req.body);

    try {

        const result = await pool.query(`SELECT * from admins WHERE email = $1`,[email]);
        const user = result.rows[0];

            console.log("Found user:", user);


        if (!user) {
             res.status(401).json({ message: "Invalid email or password" });
             return;
        }
        const isMatch = await bcrypt.compare(password, user.password_hash)

        if (!isMatch) {
             res.status(401).json({ message: "Invalid email or password" });
             return;
        }

        const token = jwt.sign({user_id:user.id},JWT_SECRET,{expiresIn:"1h"})

        res.json({token})

        return;
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }

})

export default router;