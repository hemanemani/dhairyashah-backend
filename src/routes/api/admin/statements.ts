import express, { Request, Response } from "express";
import { authMiddleware } from "../../../middleware/auth";
import pool from "../../../db";


const router = express.Router();

router.get('/', async(req:Request, res:Response):Promise<void> => {
try {
    const result = await pool.query(`SELECT * FROM statements WHERE id = 1`);
    if (result.rows.length === 0) {
      res.json({ 
        
        statement_heading:"",
        statement_description:"",
        statement_testmonial:"",
        statement_date:""
      });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }

})

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  const { statement_heading, statement_description, statement_testmonial,statement_date} = req.body;

  try {
    const result = await pool.query(`
      STORE site_settings SET
        statement_heading = $1,
        statement_description = $2,
        statement_testmonial = $3,
        statement_date = $4,
        created_at = NOW()
        updated_at = NOW();    `, [
      statement_heading, statement_description, statement_testmonial, statement_testmonial
    ]);

    res.json(result.rows[0]);

  } catch (err) {
    console.error("Error updating statements:", err);
    res.status(500).json({ error: "Server error while updating statements" });
  }
});