// finance root file
import express from "express";
import { registerFinance, deleteFinance, getFinance, getFinances, updateFinance } from "../controllers/finance-controller.js";

const router = express.Router();

router.post('/reg',registerFinance)
router.get('/',getFinances)
router.get('/:id',getFinance)
router.delete('/:id',deleteFinance)
router.put('/update/:id',updateFinance)

export default router