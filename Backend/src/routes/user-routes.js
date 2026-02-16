// User Routes

import express from "express";

const router = express.Router();

// Import user controller
import {
  getUsers,
  UserRegister,
  getUser,
  deleteUser,
  loginUser,
  updateUser,
} from "../controllers/user-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import AuthorizeRole from "../middlewares/role-middleware.js";

router.get(
  "/",
  authMiddleware,
  AuthorizeRole("SUPER_ADMIN", "ADMIN"),
  getUsers
);
router.post(
  "/auth/reg",
  
  UserRegister
);
router.put(
  "/edit/:id",
  authMiddleware,
  AuthorizeRole("SUPER_ADMIN", "ADMIN"),
  updateUser
);
router.post("/auth/login", loginUser);
router.get(
  "/:id",
  authMiddleware,
  AuthorizeRole("SUPER_ADMIN", "ADMIN"),
  getUser
);
router.delete(
  "/:id",
  authMiddleware,
  AuthorizeRole("SUPER_ADMIN", "ADMIN"),
  deleteUser
);

// Export router
export default router;
