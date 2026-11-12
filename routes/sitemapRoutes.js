import express from "express"
import {generatesitemap} from "../controllers/sitemapController"
const router =express.Router();

router.get("/sitemap.xml",generatesitemap);

export default router;