import express from "express";
import {
  registerMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
} from "../controllers/member-controllers.js";

const router = express.Router();

// Register a new member
router.post("/", registerMember);

// Get all members
router.get("/", getAllMembers);

// Get a member by ID
router.get("/:id", getMemberById);

// Update a member
router.put("/:id", updateMember);

// Delete a member
router.delete("/:id", deleteMember);

export default router;
