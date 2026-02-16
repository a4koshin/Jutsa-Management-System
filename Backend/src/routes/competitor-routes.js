import express from "express";

import { registerCompetitor, getAllCompetitors,getCompetitorById ,deleteCompetitor, updatedCompetitor } from "../controllers/competitor-controller.js";


const router = express.Router();

router.post("/", registerCompetitor);

router.get("/", getAllCompetitors);

router.get('/:id',getCompetitorById)

router.put("/update/:id", updatedCompetitor)

router.delete("/:id", deleteCompetitor);


export default router;
