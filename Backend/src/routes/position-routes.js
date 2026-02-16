import express from "express";
import {
  getAllPositions,
  getPositionById,
  registerPosition,
  updatePosition,
  deletePosition,
} from "../controllers/position-controller.js";

const router = express.Router();

router.get("/", getAllPositions);
router.get("/:id", getPositionById);
router.post("/", registerPosition);
router.put("/:id", updatePosition);
router.delete("/:id", deletePosition);

export default router;
