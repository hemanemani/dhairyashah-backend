import express, { Request, Response } from "express";
import pool from "../../../db";
import { authMiddleware } from "../../../middleware/auth";


const router = express.Router();

router.get("/" ,async (req:Request, res:Response):Promise<void> => {
  try {
    const result = await pool.query(`SELECT * FROM statements WHERE id = 1`);
    if (result.rows.length === 0) {
      res.json({ 
        statement_heading:"",
        statement_description:"",
        statement_testimonial:[]
      });
    } else {
      const data = result.rows[0];
      const parsedTestimonials = typeof data.statement_testimonial === 'string'
      ? JSON.parse(data.statement_testimonial)
      : data.statement_testimonial;

      res.json({
        ...data,
        statement_testimonial: parsedTestimonials || []
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/", authMiddleware, async (req: Request, res: Response) => {
  const {
    statement_heading,statement_description,statement_testimonial
  } = req.body;

  console.log("Received testimonial:", statement_testimonial);
console.log("Type of:", typeof statement_testimonial);


  try {
    const result = await pool.query(`
      UPDATE statements SET
        statement_heading = $1,
        statement_description = $2,
        statement_testimonial = $3::jsonb,
        updated_at = NOW()
      WHERE id = 1
      RETURNING *;
    `, [
     statement_heading,statement_description, JSON.stringify(statement_testimonial)
,
    ]);

    res.json(result.rows[0]);

  } catch (err) {
    console.error("Error updating statements:", err);
    res.status(500).json({ error: "Server error while updating settings" });
  }
});




export default router;
