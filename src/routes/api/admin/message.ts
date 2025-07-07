import express ,{Request,Response} from "express";
import pool from "../../../db";
import { authMiddleware } from "../../../middleware/auth";


const router = express.Router();

router.post("/",authMiddleware,async(req:Request,res:Response)=>{
    const {name,email,subject,message} = req.body
    try {
    await pool.query("INSERT INTO messages (name, email,subject,message) VALUES ($1, $2, $3, $4)",
      [name, email,subject,message]);
    res.json("message saved successfully")
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error saving message" });
    }
})

router.get("/", authMiddleware, async (req:Request, res:Response):Promise<void> => {
  try {
    const result = await pool.query(`SELECT * FROM messages ORDER BY created_at DESC`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
