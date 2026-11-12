import express from "express";
const router =express.Router();
import {generatesitemap} from "../controllers/sitemapController.js"

router.get("/sitemap.xml",generatesitemap);

export default router;