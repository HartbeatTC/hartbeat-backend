import { EventUnit } from '../../utils/enum';
import { STRING, ENUM, DATE, BOOLEAN, FLOAT, TEXT } from 'sequelize';
import db from '../db';
const eventUnitValues: string[] = Object.values(EventUnit) as string[];
const Race = db.define('race', {
  event_title: {
    type: STRING,
    allowNull: false,
  },
  event_date: {
    type: DATE,
    allowNull: false,
  },
  event_location: {
    type: STRING,
    allowNull: false,
  },
  event_distance: {
    type: FLOAT,
    allowNull: false,
  },
  event_unit: {
    type: ENUM(...eventUnitValues),
    allowNull: false,
  },
  event_description: {
    type: TEXT,
  },
  isPublic: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  isDeleted: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});
export default Race;
