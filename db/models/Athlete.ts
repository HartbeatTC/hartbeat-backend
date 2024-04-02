import { AthleteGender, AthleteDivision } from '../../utils/enum';
import { STRING, ENUM, TEXT, DATEONLY, JSON, BOOLEAN } from 'sequelize';
import db from '../db';
const genderValues: string[] = Object.values(AthleteGender) as string[];
const divisionValues: string[] = Object.values(AthleteDivision) as string[];
const Athlete = db.define('athlete', {
  firstName: {
    type: STRING,
    allowNull: false,
  },
  lastName: {
    type: STRING,
    allowNull: false,
  },
  gender: {
    type: ENUM(...genderValues),
    allowNull: false,
  },
  division: {
    type: ENUM(...divisionValues),
    allowNull: false,
  },
  teams: {
    type: JSON,
    allowNull: true,
  },
  profession: {
    type: STRING,
    allowNull: true,
  },
  prs: {
    type: JSON,
    allowNull: true,
  },
  about: {
    type: TEXT,
    allowNull: true,
  },
  birthday: {
    type: DATEONLY,
    allowNull: true,
  },
  formerMember: {
    type: BOOLEAN,
    allowNull: true,
  },
});

export default Athlete;
