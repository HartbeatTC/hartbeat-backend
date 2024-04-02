import express from 'express';
import * as userController from '../controllers/userController';
const router = express.Router();

router.get('/:athleteId', userController.getAthleteData);

export default router;
