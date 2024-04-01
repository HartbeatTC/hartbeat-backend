import { UserRole, BoardMemberRole } from '../../utils/enum';
import { STRING, ENUM, BOOLEAN } from 'sequelize';
import db from '../db';
const roleValues: string[] = Object.values(UserRole) as string[];
const boardMemberRoleValues: string[] = Object.values(
  BoardMemberRole
) as string[];
const User = db.define('user', {
  firstName: {
    type: STRING,
    allowNull: false,
  },
  lastName: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
    email: true,
  },
  firebaseId: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: ENUM(...roleValues),
    allowNull: false,
    defaultValue: UserRole.USER,
  },
  isAdmin: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isBoardMember: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  boardMemberRole: {
    type: ENUM(...boardMemberRoleValues),
    allowNull: true,
  },
});

export default User;
