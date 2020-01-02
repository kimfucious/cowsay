import express from "express";

import { getCowsay } from "../controllers/cowsay";

const router = express.Router();

router.post("/cowsay", getCowsay);

export { router as cowsayRoutes };
