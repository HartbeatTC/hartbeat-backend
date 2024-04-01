import db from './db';
import Athlete from './models/Athlete';
import Race from './models/Race';
import RaceResult from './models/RaceResult';
import User from './models/User';

Race.hasMany(RaceResult, {
  foreignKey: 'raceId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
RaceResult.belongsTo(Race, {
  foreignKey: 'raceId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Athlete.hasMany(RaceResult, {
  foreignKey: 'athleteId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

RaceResult.belongsTo(Athlete, {
  foreignKey: 'athleteId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

// New relationship between Athlete and User
Athlete.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'SET NULL', // or 'CASCADE', depending on your needs
  onUpdate: 'CASCADE',
});
User.hasOne(Athlete, {
  foreignKey: 'userId',
});

export { db, Athlete, Race, RaceResult, User };
