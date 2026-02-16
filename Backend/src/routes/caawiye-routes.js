import express from "express";

import {
  deleteCaawiye,
  getCaawiyeSupport,
  getCaawiyeById,
  registerCaawiye,
  updateCaawiye,
} from "../../controllers/caawiye-controller.js";

const router = express.Router();

router.route("/").get(getCaawiyeSupport).post(registerCaawiye);

router.route("/:id").get(getCaawiyeById).put(updateCaawiye).delete(deleteCaawiye);

export default router;
