import express, { Request, Response } from "express";
import pool from "../../../db";
import { authMiddleware } from "../../../middleware/auth";


const router = express.Router();

router.get("/" ,async (req:Request, res:Response):Promise<void> => {
  try {
    const result = await pool.query(`SELECT * FROM site_settings WHERE id = 1`);
    if (result.rows.length === 0) {
      res.json({ 
        banner_content: "", 
        banner_image_url: "", 
        about_content:'', 
        about_image_url:'',
        project_title:'',
        project_description:'',
        project_image_url:'',
        contact_email:'',
        contact_description:'',
        facebook:'',
        instagram:'',
        linkedin:'' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/", authMiddleware, async (req: Request, res: Response) => {
  const { banner_content, banner_image_url, about_content,about_image_url,project_title,project_description,project_image_url,contact_email,contact_description,facebook,instagram,linkedin } = req.body;

  try {
    const result = await pool.query(
  `
        UPDATE site_settings
        SET
          banner_content = $1,
          banner_image_url = $2,
          about_content = $3,
          about_image_url = $4,
          project_title = $5,
          project_description = $6,
          project_image_url = $7,
          contact_email = $8,
          contact_description = $9,
          facebook = $10,
          instagram = $11,
          linkedin = $12,
          updated_at = NOW()
        WHERE id = 1
        RETURNING *
        `,
        [
          banner_content,
          banner_image_url,
          about_content,
          about_image_url,
          project_title,
          project_description,
          project_image_url,
          contact_email,
          contact_description,
          facebook,
          instagram,
          linkedin
        ]
      );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving profile" });
  }
});



export default router;
