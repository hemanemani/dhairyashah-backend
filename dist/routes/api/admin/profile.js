"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../../../db"));
const auth_1 = require("../../../middleware/auth");
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query(`SELECT * FROM site_settings WHERE id = 1`);
        if (result.rows.length === 0) {
            res.json({
                banner_content: "",
                banner_image_url: "",
                about_content: '',
                about_image_url: '',
                project_title: '',
                project_description: '',
                project_image_url: '',
                contact_email: '',
                contact_description: '',
                facebook: '',
                instagram: '',
                linkedin: ''
            });
        }
        else {
            res.json(result.rows[0]);
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}));
router.put("/", auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { banner_content, banner_image_url, about_content, about_image_url, project_title, project_description, project_image_url, contact_email, contact_description, facebook, instagram, linkedin } = req.body;
    try {
        const result = yield db_1.default.query(`
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
        `, [
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
        ]);
        res.json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error saving profile" });
    }
}));
exports.default = router;
