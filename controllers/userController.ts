import { RequestHandler } from 'express';
import { Athlete, User } from '../db';
import { UserRole } from '../utils/enum';
import { Op } from 'sequelize';

export const getAthleteData: RequestHandler = async (req, res, next) => {
  try {
    // get the athleteId parameter from the request
    const athleteId = req.params.athleteId;
    if (!athleteId) {
      return res.status(400).send('Not a valid user');
    }

    const athlete = await User.findOne({
      where: {
        firebaseId: athleteId,
        role: {
          [Op.or]: [UserRole.MEMBER, UserRole.ADMIN],
        },
      },
      include: {
        model: Athlete,
        as: 'athlete',
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
            'id',
            'userId',
            'firstName',
            'lastName',
          ],
        },
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'id', 'firebaseId', 'isAdmin'],
      },
    });
    if (!athlete) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(athlete);
  } catch (error) {
    next(error);
  }
};
