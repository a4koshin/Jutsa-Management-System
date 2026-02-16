import express from 'express'

import { registerSport,getAllSports,getSingleSport, deleteSport, updateSport} from "../controllers/sport-controller.js"


const router = express.Router();

router.post('/',registerSport)

router.get('/',getAllSports)

router.get('/:id',getSingleSport)

router.put('/:id',updateSport)

router.delete('/:id',deleteSport)

export default router;