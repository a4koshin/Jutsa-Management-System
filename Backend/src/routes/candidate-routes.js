import express from "express";

import {
  getAllCandidates,
  deleteCandidate,
  getCandidateById,
  registerCandidate,
  updateCandidate,
} from "../controllers/candidate-controller.js";
// import authMiddleware from "../middlewares/auth-middleware.js";

const router = express.Router();

// router.get("/", authMiddleware, getAllCandidates);
router.post("/", registerCandidate);
// router.get(
//   "/:id",
//   authMiddleware,
//   getCandidateById
// );
// router.put(
//   "/:id",
//   authMiddleware,
//   updateCandidate
// );
// router.delete(
//   "/:id",
//   authMiddleware,

//   deleteCandidate
// );

export default router;
