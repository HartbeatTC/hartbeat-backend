import { AthleteDivision, AthleteGender } from '../utils/enum';

export interface IAthlete {
  firstName: string;
  lastName: string;
  gender: AthleteGender;
  division: AthleteDivision;
  formerMember?: boolean | null;
  user: IUser;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isAdmin: boolean;
  isBoardMember: boolean;
  boardMemberRole: string;
}

export interface IDivisionCategorizedAthletes {
  [division: string]: IAthlete[];
}

export interface IGenderCategorizedAthletes {
  [gender: string]: IDivisionCategorizedAthletes;
}

export interface ICategorizedAthletesResponse {
  categorizedAthletes: IGenderCategorizedAthletes;
  maxRows: number;
}
