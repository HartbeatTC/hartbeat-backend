import { AthleteGender, AthleteDivision } from '../../utils/enum';
import { STRING, ENUM } from 'sequelize';
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
});

export default Athlete;
