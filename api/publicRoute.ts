import express from 'express';
import * as publicController from '../controllers/publicController';
const router = express.Router();

router.get('/team-members', publicController.getAllAthletes);
router.get('/former-members', publicController.getAthleteAlum);
router.get('/member/:athleteId', publicController.getAthleteData);

router.get(
  '/team-members/categorizedByGender',
  publicController.getAthletesByGender
);
router.get('/team-members/:category', publicController.getAthletesByDivision);

export default router;
