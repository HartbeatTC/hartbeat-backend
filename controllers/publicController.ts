import { RequestHandler } from 'express';
import { Athlete, User } from '../db';
import { AuthRequest } from '../middleware/types';
import {
  IAthlete,
  ICategorizedAthletesResponse,
  IGenderCategorizedAthletes,
} from '../interface/IAthlete';
import { Op } from 'sequelize';
import { AthleteDivision, UserRole } from '../utils/enum';

export const getAllAthletes: RequestHandler = async (req, res, next) => {
  try {
    const athletes = await Athlete.findAll({
      attributes: ['firstName', 'lastName', 'gender', 'division'],
    });
    res.status(200).send(athletes);
  } catch (error) {
    next(error);
  }
};

export const getAthletesByGender: RequestHandler = async (req, res, next) => {
  try {
    const athletes = (await Athlete.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'id', 'userId'],
      },
      where: {
        formerMember: false || null,
      },
    })) as IAthlete[];
    // Categorize athletes by gender
    const categorizedAthletes = athletes.reduce(
      (acc: Record<string, IAthlete[]>, athlete: IAthlete) => {
        const { gender } = athlete;
        acc[gender] = acc[gender] || [];
        acc[gender].push(athlete);
        return acc;
      },
      {}
    );

    const maxRows = Math.max(
      ...Object.values(categorizedAthletes).map((group) => group.length)
    );
    res.status(200).json({ categorizedAthletes, maxRows });
  } catch (error) {
    next(error);
  }
};

export const getAthleteAlum: RequestHandler = async (req, res, next) => {
  try {
    const athletes = (await Athlete.findAll({
      attributes: ['firstName', 'lastName'],
      where: {
        formerMember: true,
      },
    })) as IAthlete[];

    res.status(200).json(athletes);
  } catch (error) {
    next(error);
  }
};

export const getAthletesByDivision: RequestHandler = async (req, res, next) => {
  try {
    const category = req.params.category;
    console.log('category', category);
    let whereCondition = {};
    // Check if the category is a division or a gender
    if (['masters', 'youth', 'junior'].includes(category)) {
      whereCondition = { division: category };
    } else if (['male', 'female', 'non-binary'].includes(category)) {
      whereCondition = {
        gender: category,
        division: {
          [Op.ne]: AthleteDivision.MASTERS,
        },
      };
    } else {
      return res.status(400).json({ error: 'Invalid category provided' });
    }

    const athletes = (await Athlete.findAll({
      where: whereCondition,
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'id', 'userId'],
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'firstName',
              'lastName',
              'id',
              'role',
              'isAdmin',
              'email',
            ],
          },
        },
      ],
    })) as IAthlete[];

    res.status(200).json(athletes);
  } catch (error) {
    next(error);
  }
};

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

export const getCategorizedAthletes: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const athletes = (await Athlete.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'id', 'userId'],
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'firstName',
              'lastName',
              'id',
              'role',
              'isAdmin',
              'email',
            ],
          },
        },
      ],
    })) as IAthlete[];
    // Categorize athletes by gender
    const genderCategorizedAthletes =
      athletes.reduce<IGenderCategorizedAthletes>((acc, athlete) => {
        acc[athlete.gender] = acc[athlete.gender] || {};
        return acc;
      }, {});
    console.log(genderCategorizedAthletes);
    // Further categorization within each gender by division
    Object.keys(genderCategorizedAthletes).forEach((gender) => {
      athletes
        .filter((athlete) => athlete.gender === gender)
        .forEach((athlete) => {
          const division = athlete.division;
          if (!genderCategorizedAthletes[gender][division]) {
            genderCategorizedAthletes[gender][division] = [];
          }
          if (!genderCategorizedAthletes[gender]['allAthletes']) {
            genderCategorizedAthletes[gender]['allAthletes'] = [];
          }
          genderCategorizedAthletes[gender][division].push(athlete);
          genderCategorizedAthletes[gender]['allAthletes'].push(athlete);
        });
    });

    // Determine max rows
    const maxRows = Math.max(
      ...Object.values(genderCategorizedAthletes).flatMap((divisionGroups) =>
        Object.values(divisionGroups).map((athletes) => athletes.length)
      )
    );

    const response: ICategorizedAthletesResponse = {
      categorizedAthletes: genderCategorizedAthletes,
      maxRows,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
