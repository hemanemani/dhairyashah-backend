import express, { Request, Response } from "express";
import pool from "../../../db";
import { authMiddleware } from "../../../middleware/auth";


const router = express.Router();

router.get("/" ,async (req:Request, res:Response):Promise<void> => {
  try {
    const result = await pool.query(`SELECT * FROM site_settings WHERE id = 1`);
      const data = result.rows[0];
      const parsedTestimonials = typeof data.statement_testimonial === 'string'
      ? JSON.parse(data.statement_testimonial)
      : data.statement_testimonial;

      res.json({
        ...data,
        statement_testimonial: parsedTestimonials || []
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/", authMiddleware, async (req: Request, res: Response) => {
  const {
    heading, description, designation, home_img_url,
    about_heading, about_desc,
    about_sub_one_heading, about_sub_one_desc,
    about_sub_second_heading, about_sub_second_desc,
    about_sub_third_heading, about_sub_third_desc,
    about_img_url,
    project_heading, project_desc,
    project_sub_one_heading, project_sub_one_desc, project_sub_one_img_url,
    project_sub_second_heading, project_sub_second_desc, project_sub_second_img_url,
    insights_heading, insights_desc,
    insights_sub_one_heading, insights_sub_one_desc, insights_sub_one_img_url,
    insights_sub_second_heading, insights_sub_second_desc, insights_sub_second_img_url,
    insights_sub_third_heading, insights_sub_third_desc, insights_sub_third_img_url,
    contact_heading, contact_description,contact_sub_heading,contact_sub_description,statement_heading,statement_description,statement_testimonial,email,
    instagram, facebook, linkedin,
    meta_title, meta_keywords, meta_description
  } = req.body;

  try {
    const result = await pool.query(`
      UPDATE site_settings SET
        heading = $1,
        description = $2,
        designation = $3,
        home_img_url = $4,
        about_heading = $5,
        about_desc = $6,
        about_sub_one_heading = $7,
        about_sub_one_desc = $8,
        about_sub_second_heading = $9,
        about_sub_second_desc = $10,
        about_sub_third_heading = $11,
        about_sub_third_desc = $12,
        about_img_url = $13,
        project_heading = $14,
        project_desc = $15,
        project_sub_one_heading = $16,
        project_sub_one_desc = $17,
        project_sub_one_img_url = $18,
        project_sub_second_heading = $19,
        project_sub_second_desc = $20,
        project_sub_second_img_url = $21,
        insights_heading = $22,
        insights_desc = $23,
        insights_sub_one_heading = $24,
        insights_sub_one_desc = $25,
        insights_sub_one_img_url = $26,
        insights_sub_second_heading = $27,
        insights_sub_second_desc = $28,
        insights_sub_second_img_url = $29,
        insights_sub_third_heading = $30,
        insights_sub_third_desc = $31,
        insights_sub_third_img_url = $32,
        contact_heading = $33,
        contact_description = $34,
        contact_sub_heading=$35,
        contact_sub_description=$36,
        statement_heading = $37,
        statement_description = $38,
        statement_testimonial = $39,
        instagram = $40,
        facebook = $41,
        linkedin = $42,
        meta_title = $43,
        meta_keywords = $44,
        meta_description = $45,
        email = $46,
        updated_at = NOW()
      WHERE id = 1
      RETURNING *;
    `, [
      heading, description, designation, home_img_url,
      about_heading, about_desc,
      about_sub_one_heading, about_sub_one_desc,
      about_sub_second_heading, about_sub_second_desc,
      about_sub_third_heading, about_sub_third_desc,
      about_img_url,
      project_heading, project_desc,
      project_sub_one_heading, project_sub_one_desc, project_sub_one_img_url,
      project_sub_second_heading, project_sub_second_desc, project_sub_second_img_url,
      insights_heading, insights_desc,
      insights_sub_one_heading, insights_sub_one_desc, insights_sub_one_img_url,
      insights_sub_second_heading, insights_sub_second_desc, insights_sub_second_img_url,
      insights_sub_third_heading, insights_sub_third_desc, insights_sub_third_img_url,
      contact_heading, contact_description,contact_sub_heading,contact_sub_description,statement_heading,statement_description,statement_testimonial,
      instagram, facebook, linkedin,
      meta_title, meta_keywords, meta_description,email
    ]);

    res.json(result.rows[0]);

  } catch (err) {
    console.error("Error updating site_settings:", err);
    res.status(500).json({ error: "Server error while updating settings" });
  }
});




export default router;
