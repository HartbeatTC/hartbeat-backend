import { TIME, INTEGER } from 'sequelize';
import db from '../db';
const RaceResult = db.define('raceResult', {
  race_id: {
    type: INTEGER,
    allowNull: false,
    foreignKey: true,
  },
  athlete_id: {
    type: INTEGER,
    allowNull: false,
    foreignKey: true,
  },
  total_time: {
    type: TIME,
    allowNull: false,
  },
  overall_place: {
    type: INTEGER,
    allowNull: false,
  },
  gender_place: {
    type: INTEGER,
    allowNull: false,
  },
  division_place: {
    type: INTEGER,
    allowNull: false,
  },
});

export default RaceResult;
